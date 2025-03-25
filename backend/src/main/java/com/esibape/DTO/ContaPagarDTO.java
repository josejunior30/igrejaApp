package com.esibape.DTO;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.esibape.entities.ContaPagar;
import com.esibape.entities.DescricaoConta;
import com.esibape.entities.RequerimentoOrçamento;
import com.esibape.entities.StatusPagamento;
import com.esibape.entities.TipoDespesa;
import com.esibape.entities.Transacao;
import com.fasterxml.jackson.annotation.JsonFormat;




public class ContaPagarDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	  private Long id;
	    private String descricao;
	    private BigDecimal valor;
	    private LocalDate dataVencimento;
	    @Enumerated(EnumType.STRING)
	    private StatusPagamento status;
	    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	    private LocalDateTime dataCriacao;
	    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	    private LocalDateTime dataPagamento;
	    private DescricaoConta descricaoConta;
	    private String createdBy;
	    private String createdByConta;
	    private TipoDespesa tipoDespesa;
	    private List<TransacaoDTO> transacao = new ArrayList<>();
	    private List<RequerimentoOrçamentoDTO>requerimentoOrçamento = new ArrayList<>();
	    public ContaPagarDTO() {
			
			
	}

	public ContaPagarDTO(ContaPagar entity) {
		
		this.id=entity.getId();
		descricao= entity.getDescricao();
		   this.descricaoConta = entity.getDescricaoConta();
		dataVencimento=entity.getDataVencimento();
		dataCriacao=entity.getDataCriacao();
		status=entity.getStatus();
		createdBy=entity.getCreatedBy();
		valor=entity.getValor();
		dataPagamento=entity.getDataPagamento();
		createdByConta=entity.getCreatedByConta();
		tipoDespesa=entity.getTipoDespesa();

	}
	public ContaPagarDTO(ContaPagar entity, List<Transacao> transacao, List<RequerimentoOrçamento>requerimentoOrçamento ) {
		  this(entity);
		  
		  transacao.forEach(cha -> this.transacao.add(new TransacaoDTO(cha)));       
		  requerimentoOrçamento.forEach(y-> this.requerimentoOrçamento.add(new RequerimentoOrçamentoDTO(y)));
	}
	public Long getId() {
		return id;
	}


	public DescricaoConta getDescricaoConta() {
		return descricaoConta;
	}

	public void setDescricaoConta(DescricaoConta descricaoConta) {
		this.descricaoConta = descricaoConta;
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


	public List<RequerimentoOrçamentoDTO> getRequerimentoOrçamento() {
		return requerimentoOrçamento;
	}

	public void setRequerimentoOrçamento(List<RequerimentoOrçamentoDTO> requerimentoOrçamento) {
		this.requerimentoOrçamento = requerimentoOrçamento;
	}

	public TipoDespesa getTipoDespesa() {
		return tipoDespesa;
	}

	public void setTipoDespesa(TipoDespesa tipoDespesa) {
		this.tipoDespesa = tipoDespesa;
	}

	public BigDecimal getValor() {
		return valor;
	}


	public String getCreatedByConta() {
		return createdByConta;
	}

	public void setCreatedByConta(String createdByConta) {
		this.createdByConta = createdByConta;
	}

	public LocalDateTime getDataPagamento() {
		return dataPagamento;
	}

	public void setDataPagamento(LocalDateTime dataPagamento) {
		this.dataPagamento = dataPagamento;
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


	
	public List<TransacaoDTO> getTransacao() {
		return transacao;
	}

	public void setTransacao(List<TransacaoDTO> transacao) {
		this.transacao = transacao;
	}

	public StatusPagamento getStatus() {
		return status;
	}


	public void setStatus(StatusPagamento status) {
		this.status = status;
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