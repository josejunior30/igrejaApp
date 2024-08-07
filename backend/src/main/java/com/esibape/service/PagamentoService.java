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
import com.esibape.entities.FormaPagamento;
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
        updateTotalPixForAllPagamentos();
        return list.stream()
                   .map(x -> {
                       PagamentoDTO dto = new PagamentoDTO(x, x.getAlunosPG());
                       verificarStatusPagamento(dto.getAlunosPG());
                       return dto;
                   })
                   .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PagamentoDTO findById(Long id) {
        Optional<Pagamento> pagamento = repository.findById(id);
        if (!pagamento.isPresent()) {
            throw new EntityNotFoundException("Pagamento não encontrado.");
        }
        Pagamento entity = pagamento.get();
        PagamentoDTO dto = new PagamentoDTO(entity);
        verificarStatusPagamento(dto.getAlunosPG());
        return dto;
    }

    @Transactional
    public PagamentoDTO insert(PagamentoDTO dto) {
        Pagamento entity = new Pagamento();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        updateTotalMesForPagamentos(entity.getMesReferencia());
        updateTotalForAllPagamentos();
        updateTotalPixForPagamentos(entity.getMesReferencia());
        verificarStatusPagamento(dto.getAlunosPG());
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
        updateTotalPixForPagamentos(entity.getMesReferencia());
        verificarStatusPagamento(dto.getAlunosPG());
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
        updateTotalPixForPagamentos(entity.getMesReferencia());
        verificarStatusPagamento(new AlunosDTO(entity.getAlunosPG()));
    }

    private void copyDtoToEntity(PagamentoDTO dto, Pagamento entity) {
        entity.setValor(dto.getValor());
        entity.setDataPagamento(dto.getDataPagamento());
        entity.setFormaPagamento(dto.getFormaPagamento());
        entity.setMesReferencia(dto.getMesReferencia());
        entity.setAtrasado(dto.getAtrasado());
       
        AlunosDTO pgDTO = dto.getAlunosPG();
        Alunos alunos = alunosRepository.getReferenceById(pgDTO.getId());
        entity.setAlunosPG(alunos);
    }

    @Transactional
    private void updateTotalMesForPagamentos(MesReferencia mesReferencia) {
        Integer totalMes = repository.sumValoresByMesReferencia(mesReferencia);
        System.out.println("Total Mes for " + mesReferencia + ": " + totalMes);
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotalMensalidade(totalMes);
            System.out.println("Setting totalMensalidade for pagamento " + pagamento.getId() + ": " + totalMes);
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
        System.out.println("Total for all pagamentos: " + total);

        List<Pagamento> pagamentos = repository.findAll();

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotal(total);
            System.out.println("Setting total for pagamento " + pagamento.getId() + ": " + total);
            repository.save(pagamento);
        }
    }

    @Transactional
    private void updateTotalPixForPagamentos(MesReferencia mesReferencia) {
        FormaPagamento formaPagamentoPix = FormaPagamento.PIX;
        Integer totalPix = repository.sumValoresByFormaPagamentoAndMesReferencia(formaPagamentoPix, mesReferencia);
        System.out.println("Total PIX for " + mesReferencia + ": " + totalPix);
        
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotalPix(totalPix);
            System.out.println("Before Save: totalPix for pagamento " + pagamento.getId() + ": " + pagamento.getTotalPix());
            repository.save(pagamento);
            System.out.println("After Save: totalPix for pagamento " + pagamento.getId() + ": " + pagamento.getTotalPix());
        }
    }

    @Transactional
    private void updateTotalPixForAllPagamentos() {
        List<MesReferencia> meses = repository.findAll().stream()
                                              .map(Pagamento::getMesReferencia)
                                              .distinct()
                                              .collect(Collectors.toList());

        for (MesReferencia mes : meses) {
            updateTotalPixForPagamentos(mes);
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
        updateTotalPixForAllPagamentos();
        updateTotalDinheiroForAllPagamentos(); 
        return pagamentosMesAtual.stream()
                                 .map(x -> {
                                     PagamentoDTO dto = new PagamentoDTO(x, x.getAlunosPG());
                                     verificarStatusPagamento(dto.getAlunosPG());
                                     return dto;
                                 })
                                 .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PagamentoDTO> findPagamentosByMesReferencia(MesReferencia mesReferencia) {
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);
        updateTotalMesForAllPagamentos();
        updateTotalForAllPagamentos();
        updateTotalPixForAllPagamentos();
        updateTotalDinheiroForAllPagamentos(); 
        return pagamentos.stream()
                         .map(pagamento -> {
                             PagamentoDTO dto = new PagamentoDTO(pagamento, pagamento.getAlunosPG());
                             verificarStatusPagamento(dto.getAlunosPG());
                             return dto;
                         })
                         .collect(Collectors.toList());
    }

    public void verificarStatusPagamento(AlunosDTO dto) {
        LocalDate hoje = LocalDate.now();
        LocalDate dia10DoMes = LocalDate.of(hoje.getYear(), hoje.getMonth(), 10);

        boolean temPagamento = !dto.getPagamentos().isEmpty();

        boolean todosMesesPagos = true;
        for (int i = 1; i <= hoje.getMonthValue(); i++) {
            MesReferencia mesReferencia = MesReferencia.fromNumero(i);
            boolean mesPago = dto.getPagamentos().stream()
                .anyMatch(pagamento -> pagamento.getMesReferencia().equals(mesReferencia));
            if (!mesPago) {
                todosMesesPagos = false;
                break;
            }
        }

        if (todosMesesPagos && temPagamento) {
            dto.setStatusPagamento("Pago");
        } else if (hoje.isBefore(dia10DoMes)) {
            dto.setStatusPagamento("Em Dia");
        } else {
            dto.setStatusPagamento("Pendente");
        }
    }
    

    @Transactional
    private void updateTotalDinheiroForPagamentos(MesReferencia mesReferencia) {
        FormaPagamento formaPagamentoDinheiro = FormaPagamento.DINHEIRO; // ajuste conforme sua enumeração
        Integer totalDinheiro = repository.sumValoresByFormaPagamentoAndMesReferencia(formaPagamentoDinheiro, mesReferencia);
        System.out.println("Total Dinheiro for " + mesReferencia + ": " + totalDinheiro);
        
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotalDinheiro(totalDinheiro);
            System.out.println("Before Save: totalDinheiro for pagamento " + pagamento.getId() + ": " + pagamento.getTotalDinheiro());
            repository.save(pagamento);
            System.out.println("After Save: totalDinheiro for pagamento " + pagamento.getId() + ": " + pagamento.getTotalDinheiro());
        }
    }

    @Transactional
    private void updateTotalDinheiroForAllPagamentos() {
        List<MesReferencia> meses = repository.findAll().stream()
                                              .map(Pagamento::getMesReferencia)
                                              .distinct()
                                              .collect(Collectors.toList());

        for (MesReferencia mes : meses) {
            updateTotalDinheiroForPagamentos(mes);
        }
    }

}