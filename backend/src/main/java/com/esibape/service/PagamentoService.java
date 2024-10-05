package com.esibape.service;

import java.time.LocalDate;
import java.util.Collections;
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
import com.esibape.entities.Projetos;
import com.esibape.repository.AlunosRepository;

import com.esibape.repository.PagamentoRepository;
import com.esibape.repository.ProjetosRepository;
import com.esibape.service.exception.EntityNotFoundException;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository repository;
    @Autowired
    private AlunosRepository alunosRepository;
    @Autowired
    private ProjetosRepository projetosRepository;
 
    
    @Transactional(readOnly = true)
    public List<PagamentoDTO> findAll() {
        List<Pagamento> list = repository.findAll();
        updateTotalMesForAllPagamentos();
       
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

        // Verifica se a forma de pagamento é GRATIS e ajusta o valor
        if (dto.getFormaPagamento() == FormaPagamento.GRATIS) {
            dto.setValor(0);
        }

        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        updateTotalMesForPagamentos(entity.getMesReferencia());
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

        // Verifica se a forma de pagamento é GRATIS e ajusta o valor
        if (dto.getFormaPagamento() == FormaPagamento.GRATIS) {
            dto.setValor(0);
        }

        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        updateTotalMesForPagamentos(entity.getMesReferencia());
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
    
    
    @Transactional(readOnly = true)
    public List<PagamentoDTO> getPagamentosByAluno(Long alunoId) {
        // Recupera o aluno pelo ID
        Alunos aluno = alunosRepository.findById(alunoId)
                                       .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado."));
        
        // Recupera os pagamentos para o aluno
        List<Pagamento> pagamentos = repository.findPagamentosByAluno(aluno);
        
        // Converte os pagamentos para PagamentoDTO
        return pagamentos.stream()
                         .map(pagamento -> {
                             // Cria um novo PagamentoDTO
                             PagamentoDTO dto = new PagamentoDTO();
                             
                             // Preenche os atributos do DTO
                             dto.setId(pagamento.getId());
                             dto.setValor(pagamento.getValor());
                             dto.setDataPagamento(pagamento.getDataPagamento());
                             dto.setFormaPagamento(pagamento.getFormaPagamento());
                             dto.setMesReferencia(pagamento.getMesReferencia());
                             dto.setAtrasado(pagamento.getAtrasado());
                             dto.setTotalCartao(pagamento.getTotalCartao());
                       

                             return dto;
                         })
                         .collect(Collectors.toList());
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
    
    

    @Transactional(readOnly = true)
    public List<PagamentoDTO> findPagamentosByMesReferencia(MesReferencia mesReferencia) {
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);
        updateTotalMesForAllPagamentos();
        updateTotalPixForAllPagamentos();
        updateTotalDinheiroForAllPagamentos(); 
        updateTotalCartaoForAllPagamentos();
        return pagamentos.stream()
                         .map(pagamento -> {
                             PagamentoDTO dto = new PagamentoDTO(pagamento, pagamento.getAlunosPG());
                             verificarStatusPagamento(dto.getAlunosPG());
                             return dto;
                         })
                         .collect(Collectors.toList());
    }

//  metodos total no mes de pagamentos dinheiro, pix , cartao

    @Transactional
    private void updateTotalPixForPagamentos(MesReferencia mesReferencia) {
        FormaPagamento formaPagamentoPix = FormaPagamento.PIX;
        Integer totalPix = repository.sumValoresByFormaPagamentoAndMesReferencia(formaPagamentoPix, mesReferencia);
        
        
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotalPix(totalPix);
           
            repository.save(pagamento);
           
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
    
    @Transactional
    private void updateTotalDinheiroForPagamentos(MesReferencia mesReferencia) {
        FormaPagamento formaPagamentoDinheiro = FormaPagamento.DINHEIRO; // ajuste conforme sua enumeração
        Integer totalDinheiro = repository.sumValoresByFormaPagamentoAndMesReferencia(formaPagamentoDinheiro, mesReferencia);
        
        
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotalDinheiro(totalDinheiro);
            
            repository.save(pagamento);
            
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
    
    @Transactional
    private void updateTotalCartao(MesReferencia mesReferencia) {
        FormaPagamento formaPagamentoCARTAO = FormaPagamento.CARTAO; // ajuste conforme sua enumeração
        Integer totalCartao = repository.sumValoresByFormaPagamentoAndMesReferencia(formaPagamentoCARTAO, mesReferencia);
        
        
        List<Pagamento> pagamentos = repository.findByMesReferencia(mesReferencia);

        for (Pagamento pagamento : pagamentos) {
            pagamento.setTotalCartao(totalCartao);
            
            repository.save(pagamento);
            
        }
    }
    @Transactional
    private void updateTotalCartaoForAllPagamentos() {
        List<MesReferencia> meses = repository.findAll().stream()
                                              .map(Pagamento::getMesReferencia)
                                              .distinct()
                                              .collect(Collectors.toList());

        for (MesReferencia mes : meses) {
            updateTotalCartao(mes);
        }
    }
    
    
    		//todos pagamentos mes

    @Transactional(readOnly = true)
    public List<PagamentoDTO> findPagamentosMesAtual() {
        LocalDate hoje = LocalDate.now();
        int mesAtual = hoje.getMonthValue();
        
        MesReferencia mesReferenciaAtual = MesReferencia.fromNumero(mesAtual);
        List<Pagamento> pagamentosMesAtual = repository.findByMesReferencia(mesReferenciaAtual);
        updateTotalMesForAllPagamentos();
     
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

    
// verifica status de pagamento
    public void verificarStatusPagamento(AlunosDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("O DTO do aluno está nulo.");
        }

        if (dto.getPagamentos() == null || dto.getPagamentos().isEmpty()) {
            // Caso o aluno não tenha pagamentos, defina o status como "Pendente"
            dto.setStatusPagamento("Pendente");
            return;  // Não faz sentido continuar verificando se não há pagamentos
        }

        LocalDate hoje = LocalDate.now();
        LocalDate dia10DoMes = LocalDate.of(hoje.getYear(), hoje.getMonth(), 10);

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

        if (todosMesesPagos) {
            dto.setStatusPagamento("Pago");
        } else if (hoje.isBefore(dia10DoMes)) {
            dto.setStatusPagamento("Em Dia");
        } else {
            dto.setStatusPagamento("Pendente");
        }
    }

    
  // pagamentos por projeto
    public List<PagamentoDTO> findPagamentosByMesReferenciaAndProjetos(MesReferencia mesReferencia, Long projetoId) {
        try {
   
            Projetos projeto = projetosRepository.findById(projetoId).orElse(null);

         
            if (projeto == null) {
                System.err.println("Projeto not found for this id :: " + projetoId);
                return Collections.emptyList();
            }

      
            List<Pagamento> pagamentos = repository.findByMesReferenciaAndAlunosPG_Projetos(mesReferencia, projeto);

            // Converte a lista de Pagamento para PagamentoDTO e verifica o status dos pagamentos
            return pagamentos.stream()
                    .map(pagamento -> {
                        PagamentoDTO dto = new PagamentoDTO(pagamento, pagamento.getAlunosPG());
                        verificarStatusPagamento(dto.getAlunosPG());
                        return dto;
                    })
                    .collect(Collectors.toList());

        } catch (Exception e) {
            // Tratamento genérico de exceção
            System.err.println("An error occurred while processing the request: " + e.getMessage());
            return Collections.emptyList();
        }
    }

}