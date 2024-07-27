package com.esibape.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.PagamentoDTO;
import com.esibape.entities.Alunos;
import com.esibape.entities.MesReferencia;
import com.esibape.entities.Pagamento;
import com.esibape.repository.AlunosRepository;
import com.esibape.repository.PagamentoRepository;
import com.esibape.service.exception.EntityNotFoundException;


@Service
public class PagamentoService {
    
    @Autowired
    private PagamentoRepository repository;
    @Autowired
    private AlunosRepository alunosRepository;
    
   

    @Transactional(readOnly = true)
    public List<PagamentoDTO> findAll() {
        List<Pagamento> list = repository.findAll();
        updateTotalMesForAllPagamentos();
        updateTotalForAllPagamentos();
        return list.stream()
                   .map(x -> new PagamentoDTO(x, x.getAlunosPG()))
                   .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PagamentoDTO findById(Long id) {
        Optional<Pagamento> pagamento = repository.findById(id);
        if (!pagamento.isPresent()) {
            throw new EntityNotFoundException("Pagamento não encontrado.");
        }
        Pagamento entity = pagamento.get();
        return new PagamentoDTO(entity); // O construtor já configura totalMes
    }

    @Transactional
    public PagamentoDTO insert(PagamentoDTO dto) {
        Pagamento entity = new Pagamento();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        updateTotalMesForPagamentos(entity.getMesReferencia());
        updateTotalForAllPagamentos();
        return new PagamentoDTO(entity);
    }

    @Transactional
    public PagamentoDTO update(Long id, PagamentoDTO dto) {
        Optional<Pagamento> pagamentoOptional = repository.findById(id);
        if (!pagamentoOptional.isPresent()) {
            throw new EntityNotFoundException("Pagamento não encontrado.");
        }
        Pagamento entity = pagamentoOptional.get();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        updateTotalMesForPagamentos(entity.getMesReferencia());
        updateTotalForAllPagamentos();
        return new PagamentoDTO(entity);
    }

    public void delete(Long id) {
        Optional<Pagamento> pagamentoOptional = repository.findById(id);
        if (!pagamentoOptional.isPresent()) {
            throw new EntityNotFoundException("Pagamento não encontrado.");
        }
        Pagamento entity = pagamentoOptional.get();
        repository.deleteById(id);
        updateTotalMesForPagamentos(entity.getMesReferencia());
        updateTotalForAllPagamentos();
    }

    private void copyDtoToEntity(PagamentoDTO dto, Pagamento entity) {
        entity.setValor(dto.getValor());
        entity.setDataPagamento(dto.getDataPagamento());
        entity.setFormaPagamento(dto.getFormaPagamento());
        entity.setMesReferencia(dto.getMesReferencia());

        AlunosDTO pgDTO = dto.getAlunosPG();
        Alunos alunos = alunosRepository.getReferenceById(pgDTO.getId());
        entity.setAlunosPG(alunos);
    }

    @Transactional
    private void updateTotalMesForPagamentos(MesReferencia mesReferencia) {
        Integer totalMes = repository.sumValoresByMesReferencia(mesReferencia);
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotalMes(totalMes);
            repository.save(pagamento);
        }
    }

    @Transactional
    private void updateTotalMesForAllPagamentos() {
        List<MesReferencia> meses = repository.findAll().stream()
                                              .map(Pagamento::getMesReferencia)
                                              .distinct()
                                              .collect(Collectors.toList());

        for (MesReferencia mes : meses) {
            updateTotalMesForPagamentos(mes);
        }
    }

    @Transactional
    private void updateTotalForAllPagamentos() {
        Integer total = repository.findAll().stream()
                                  .mapToInt(Pagamento::getValor)
                                  .sum();

        List<Pagamento> pagamentos = repository.findAll();

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotal(total);
            repository.save(pagamento);
        }
    }
    @Transactional(readOnly = true)
    public List<PagamentoDTO> findPagamentosMesAtual() {
        LocalDate hoje = LocalDate.now();
        int mesAtual = hoje.getMonthValue();
        
        MesReferencia mesReferenciaAtual = MesReferencia.fromNumero(mesAtual);
        List<Pagamento> pagamentosMesAtual = repository.findByMesReferencia(mesReferenciaAtual);
        updateTotalMesForAllPagamentos();
        updateTotalForAllPagamentos();
        return pagamentosMesAtual.stream()
                                 .map(x -> new PagamentoDTO(x, x.getAlunosPG()))
                                 .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<PagamentoDTO> findPagamentosByMesReferencia(MesReferencia mesReferencia) {
        // Busca todos os pagamentos para o mesReferencia fornecido
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        // Se necessário, atualize os totais. 
        // Avalie se é necessário chamar esses métodos toda vez ou apenas quando a lista de pagamentos muda.
        updateTotalMesForAllPagamentos();
        updateTotalForAllPagamentos();

        // Converte a lista de pagamentos para a lista de DTOs
        return pagamentos.stream()
                         .map(pagamento -> new PagamentoDTO(pagamento, pagamento.getAlunosPG()))
                         .collect(Collectors.toList());
    }

}


