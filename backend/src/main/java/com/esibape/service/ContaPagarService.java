package com.esibape.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.ContaPagarDTO;
import com.esibape.entities.ContaPagar;
import com.esibape.entities.StatusPagamento;
import com.esibape.entities.TipoDespesa;
import com.esibape.entities.Transacao;
import com.esibape.repository.ContaPagarRepository;
import com.esibape.repository.TransacaoRepository;


@Service
public class ContaPagarService {
	@Autowired
	private ContaPagarRepository repository;
	
	@Autowired
	private TransacaoRepository transacaoRepository;

	@Transactional(readOnly = true)
	public List<ContaPagarDTO> findAll() {
	    List<ContaPagar> list = repository.findAll();
	    list.forEach(this::atualizarStatusSeAtrasado);
	    return list.stream()
	        .map(x -> new ContaPagarDTO(x))
	        .collect(Collectors.toList());
	}
	@Transactional(readOnly = true)
	public ContaPagarDTO findById(Long id) {
	    Optional<ContaPagar> optionalCurso = repository.findById(id);
	    if (optionalCurso.isPresent()) {
	    	ContaPagar contaPagar = optionalCurso.get();
	    	 atualizarStatusSeAtrasado(contaPagar);
	        return new ContaPagarDTO(contaPagar);
	    } else {
	        // You can return null or throw an exception if you prefer
	        return null;
	    }
	}
	@Transactional
	public ContaPagarDTO insert(ContaPagarDTO dto) {
	    ContaPagar entity = new ContaPagar();
	    copyDtoToEntity(dto, entity);
	    entity.setCreatedBy(getAuthenticatedUser());
	    entity.setStatus(StatusPagamento.PENDENTE); 
	    entity = repository.save(entity);
	    return new ContaPagarDTO(entity);
	}

	private String getAuthenticatedUser() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth == null) {
	        System.out.println("Authentication is null");
	        return "Sistema";
	    }

	    System.out.println("Auth class: " + auth.getClass().getName());
	    System.out.println("Principal: " + auth.getPrincipal());

	    // Se o principal for uma String (OAuth2Authentication), retorna diretamente o e-mail
	    if (auth.getPrincipal() instanceof String) {
	        return (String) auth.getPrincipal();
	    }

	    // Se o principal for UserDetails, retorna o nome de usuário
	    if (auth.getPrincipal() instanceof UserDetails) {
	        return ((UserDetails) auth.getPrincipal()).getUsername();
	    }

	    return "Sistema";
	}


	@Transactional
	public ContaPagarDTO updateStatus(Long id, StatusPagamento novoStatus) {
	    ContaPagar entity = repository.findById(id)
	        .orElseThrow(() -> new EntityNotFoundException("ContaPagar não encontrada para o ID: " + id));
	    
	    entity.setStatus(novoStatus);
	    entity = repository.save(entity);
	    
	    if (novoStatus == StatusPagamento.PAGO) {
	        Transacao transacao = new Transacao();
	        transacao.setValor(entity.getValor());
	        transacao.setData(LocalDate.now());
	        transacao.setDescricao(entity.getDescricao());
	        transacao.setIsReceita(false);
	        transacao.setTipoDespesa(TipoDespesa.VARIAVEL);
	        transacaoRepository.save(transacao);
	    }
	    
	    return new ContaPagarDTO(entity);
	}


    private void copyDtoToEntity(ContaPagarDTO dto, ContaPagar entity) {
 
          entity.setDataCriacao(dto.getDataCriacao());
          entity.setDataVencimento(dto.getDataVencimento());
          entity.setDescricao(dto.getDescricao());
     
          entity.setValor(dto.getValor());
          entity.setCreatedBy(dto.getCreatedBy());
    
       }
    @Transactional
	public void atualizarStatusSeAtrasado(ContaPagar contaPagar) {
	    if (contaPagar.getStatus() == StatusPagamento.PENDENTE && contaPagar.getDataVencimento().isBefore(LocalDate.now())) {
	        contaPagar.setStatus(StatusPagamento.ATRASADO);
	        repository.save(contaPagar);
	    }
	}
    
    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findByDescricaoStatusMesAno(String descricao, int mes, int ano) {
        LocalDate inicio = LocalDate.of(ano, mes, 1); // Primeiro dia do mês
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth()); // Último dia do mês

        List<ContaPagar> contas = repository.findByDescricaoContainingIgnoreCaseAndStatusAndDataVencimentoBetween(
            descricao, StatusPagamento.PAGO, inicio, fim);

        return contas.stream()
            .map(ContaPagarDTO::new)
            .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findByDescricaoAndAno(String descricao, int ano) {
        LocalDate inicio = LocalDate.of(ano, 1, 1);  // Primeiro dia do ano
        LocalDate fim = LocalDate.of(ano, 12, 31);   // Último dia do ano

        List<ContaPagar> contas = repository.findByDescricaoContainingIgnoreCaseAndDataVencimentoBetween(
            descricao, inicio, fim);

        return contas.stream()
            .map(ContaPagarDTO::new)
            .collect(Collectors.toList());
    }

    
    public void delete(Long id) {
    	repository.deleteById(id);
 
   }

}
