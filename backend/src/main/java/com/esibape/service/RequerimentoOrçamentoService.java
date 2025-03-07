package com.esibape.service;


import java.time.LocalDate;
import java.util.ArrayList;
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
import com.esibape.entities.TipoDespesa;
import com.esibape.entities.Transacao;
import com.esibape.repository.ContaPagarRepository;
import com.esibape.repository.RequerimentoOrçamentoRepository;
import com.esibape.repository.TransacaoRepository;

@Service
public class RequerimentoOrçamentoService {
	@Autowired
	private RequerimentoOrçamentoRepository repository;
	 @Autowired
	private EmailService emailService; 
	 
	 
		@Autowired
		private TransacaoRepository transacaoRepository;
		
		private ContaPagarRepository contaPagarRepository;
	 
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

	    if (dto.getProduto() != null) {
	        List<Produto> produtos = new ArrayList<>();
	        for (ProdutoDTO produtoDTO : dto.getProduto()) {
	            Produto produto = new Produto();
	            produto.setNome(produtoDTO.getNome());
	            produto.setPreço(produtoDTO.getPreço());
	            produto.setQuantidade(produtoDTO.getQuantidade());
	            produto.setRequerimento(entity);
	            produtos.add(produto);
	        }
	        entity.setProduto(produtos);
	    }

	    entity.calcularTotal(); // Garante que o total seja atualizado corretamente antes de salvar
	    entity = repository.save(entity);

	    try {
	        emailService.sendNewRequerimentoNotification("eleilson_mendes@hotmail.com", entity.getResponsavel());
	    } catch (MessagingException e) {
	        e.printStackTrace();
	    }

	    return new RequerimentoOrçamentoDTO(entity, entity.getProduto());
	}


	@Transactional
    public RequerimentoOrçamentoDTO updateStatus(Long id, StatusRequerimento newStatus) {
        RequerimentoOrçamento entity = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Requerimento não encontrado"));

        entity.setStatusRequerimento(newStatus);
        entity = repository.save(entity);

        if (newStatus == StatusRequerimento.APROVADO) {
            Transacao transacao = new Transacao();
            transacao.setValor(entity.getTotal()); 
            transacao.setData(LocalDate.now());
            transacao.setDescricao(entity.getPergunta1());
            transacao.setIsReceita(false);
            transacao.setTipoDespesa(TipoDespesa.VARIAVEL);
            transacaoRepository.save(transacao);
        }
        
        return new RequerimentoOrçamentoDTO(entity);
    }
	/*@Transactional
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
    }*/
	
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