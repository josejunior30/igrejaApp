package com.esibape.DTO;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.esibape.entities.ContaPagar;
import com.esibape.entities.StatusPagamento;




public class ContaPagarDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	  private Long id;
	    private String descricao;
	    private BigDecimal valor;
	    private LocalDate dataVencimento;
	    private StatusPagamento status;
	    private String fornecedor;
	    private LocalDateTime dataCriacao;
	    private String createdBy;

	
	public ContaPagarDTO() {
			
			
	}

	public ContaPagarDTO(ContaPagar entity) {
		this.id=entity.getId();
		descricao= entity.getDescricao();
		dataVencimento=entity.getDataVencimento();
		dataCriacao=entity.getDataCriacao();
		status=entity.getStatus();
		createdBy=entity.getCreatedBy();
		valor=entity.getValor();
		
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public BigDecimal getValor() {
		return valor;
	}


	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}


	public LocalDate getDataVencimento() {
		return dataVencimento;
	}


	public void setDataVencimento(LocalDate dataVencimento) {
		this.dataVencimento = dataVencimento;
	}


	public StatusPagamento getStatus() {
		return status;
	}


	public void setStatus(StatusPagamento status) {
		this.status = status;
	}


	public String getFornecedor() {
		return fornecedor;
	}


	public void setFornecedor(String fornecedor) {
		this.fornecedor = fornecedor;
	}


	public LocalDateTime getDataCriacao() {
		return dataCriacao;
	}


	public void setDataCriacao(LocalDateTime dataCriacao) {
		this.dataCriacao = dataCriacao;
	}


	public String getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	

	
}
