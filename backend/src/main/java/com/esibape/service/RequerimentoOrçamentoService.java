package com.esibape.service;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.ProdutoDTO;
import com.esibape.DTO.RequerimentoOrçamentoDTO;
import com.esibape.entities.Produto;
import com.esibape.entities.RequerimentoOrçamento;
import com.esibape.entities.StatusRequerimento;
import com.esibape.repository.RequerimentoOrçamentoRepository;

@Service
public class RequerimentoOrçamentoService {
	@Autowired
	private RequerimentoOrçamentoRepository repository;
	 @Autowired
	private EmailService emailService; 
	 
	@Transactional(readOnly = true)
	public List<RequerimentoOrçamentoDTO>findAll(){
		List<RequerimentoOrçamento> list = repository.findAll();
				 return list.stream()
				            .map(x -> {
				            	RequerimentoOrçamentoDTO dto = new RequerimentoOrçamentoDTO(x, x.getProduto());
				                return dto;
				            })
				            .collect(Collectors.toList());
	}
	@Transactional(readOnly = true)
    public RequerimentoOrçamentoDTO findById(Long id) {
		RequerimentoOrçamento entity = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Rquerimento não encontrado"));
		RequerimentoOrçamentoDTO dto = new RequerimentoOrçamentoDTO(entity, entity.getProduto());
     return dto;
    }
	
	@Transactional
    public RequerimentoOrçamentoDTO insert(RequerimentoOrçamentoDTO dto) {
        RequerimentoOrçamento entity = new RequerimentoOrçamento();
        copyDtoToEntity(dto, entity);
        entity.setStatusRequerimento(StatusRequerimento.PENDENTE);

        // Adiciona os produtos do DTO à entidade RequerimentoOrçamento
        if (dto.getProduto() != null) {
            for (ProdutoDTO produtoDTO : dto.getProduto()) {
                Produto produto = new Produto();
                produto.setNome(produtoDTO.getNome());
                produto.setPreço(produtoDTO.getPreço());
                entity.addProduto(produto);
            }
        }

        // Salva a entidade RequerimentoOrçamento com os produtos no repositório
        entity = repository.save(entity);

        // Enviar o e-mail de notificação
        String recipientEmail = "joseluizjunior@yahoo.com"; // E-mail do usuário a ser notificado
        try {
            emailService.sendNewRequerimentoNotification(recipientEmail, entity.getResponsavel());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return new RequerimentoOrçamentoDTO(entity);
    }

	@Transactional
	public RequerimentoOrçamentoDTO updateStatus(Long id, StatusRequerimento newStatus) {
	    RequerimentoOrçamento entity = repository.findById(id)
	            .orElseThrow(() -> new NoSuchElementException("Requerimento não encontrado"));

	    // Atualiza o status do requerimento
	    entity.setStatusRequerimento(newStatus);
	    entity = repository.save(entity);

	    // Envie um e-mail para o usuário que fez a requisição com base no status
	    String recipientEmail = entity.getEmailResponsavel(); // Supondo que você tenha o e-mail do responsável na entidade
	    try {
	        if (newStatus == StatusRequerimento.APROVADO) {
	            emailService.sendApprovalNotification(recipientEmail); // Chama o método para aprovação
	        } else if (newStatus == StatusRequerimento.RECUSADO) {
	            emailService.sendRejectionNotification(recipientEmail); // Chama o novo método para recusa
	        }
	    } catch (MessagingException e) {
	        // Trate a exceção conforme necessário
	        e.printStackTrace();
	    }

	    return new RequerimentoOrçamentoDTO(entity);
	}

	@Transactional
    public RequerimentoOrçamentoDTO update(Long id, RequerimentoOrçamentoDTO dto) {
        RequerimentoOrçamento entity = repository.getReferenceById(id);
        copyDtoToEntity(dto, entity);

        // Atualiza os produtos associados ao requerimento
        entity.getProduto().clear(); 

        if (dto.getProduto() != null) {
            for (ProdutoDTO produtoDTO : dto.getProduto()) {
                Produto produto = new Produto();
                produto.setNome(produtoDTO.getNome());
                produto.setPreço(produtoDTO.getPreço());

                entity.addProduto(produto);  
            }
        }

        entity = repository.save(entity);
        return new RequerimentoOrçamentoDTO(entity);
    }
	  public void delete(Long id) {
	        repository.deleteById(id);
	    }
	  
	  
	private void copyDtoToEntity(RequerimentoOrçamentoDTO dto, RequerimentoOrçamento entity) {
      
        entity.setDataAprovacao(dto.getDataAprovacao());
        entity.setDataEvento(dto.getDataEvento());
        entity.setDataPagamento(dto.getDataPagamento());
        entity.setDataRequerimento(dto.getDataRequerimento());
        entity.setLocal(dto.getLocal());
        entity.setPergunta1(dto.getPergunta1());
        entity.setPergunta2(dto.getPergunta2());
        entity.setResponsavel(dto.getResponsavel());
        entity.setQuantidade(dto.getQuantidade());
        entity.setEmailResponsavel(dto.getEmailResponsavel());
        entity.setStatusRequerimento(dto.getStatusRequerimento());
     
     
	}
}