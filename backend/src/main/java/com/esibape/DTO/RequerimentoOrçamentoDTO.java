package com.esibape.DTO;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.esibape.entities.Produto;
import com.esibape.entities.RequerimentoOrçamento;
import com.esibape.entities.StatusRequerimento;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RequerimentoOrçamentoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id; 
	private LocalDate dataRequerimento;
	private LocalDate dataEvento;
	private LocalDate dataAprovacao;
	private StatusRequerimento statusRequerimento;
	private LocalDate dataPagamento;
	@JsonProperty("O que vai ser feito ?")
	private String pergunta1;
	@JsonProperty("Qual o motivo de ser feito ?")
	private String pergunta2;
	private String responsavel;
	 private String emailResponsavel;
private Integer quantidade;
	private String local; 
	private BigDecimal Total;

	private List<ProdutoDTO> produto = new ArrayList<>();
	
	public RequerimentoOrçamentoDTO(){
		
	}

	public Long getId() {
		return id;
	}

	
	public RequerimentoOrçamentoDTO(RequerimentoOrçamento entity) {
	
		id = entity.getId();
		dataRequerimento = entity.getDataRequerimento();
		dataEvento = entity.getDataEvento();
		dataAprovacao = entity.getDataAprovacao();
		statusRequerimento = entity.getStatusRequerimento();
		dataPagamento = entity.getDataPagamento();
		pergunta1 = entity.getPergunta1();
		pergunta2 = entity.getPergunta2();
		responsavel = entity.getResponsavel();
		quantidade = entity.getQuantidade();
		local = entity.getLocal();
		Total = entity.getTotal();

		emailResponsavel= entity.getEmailResponsavel();
		
	}
	public RequerimentoOrçamentoDTO(RequerimentoOrçamento entity,List<Produto> produto ) {
		this(entity);
		produto.forEach(x-> this.produto.add(new ProdutoDTO(x)));
		
	}
	public void setId(Long id) {
		this.id = id;
	}


	public LocalDate getDataRequerimento() {
		return dataRequerimento;
	}

	public void setDataRequerimento(LocalDate dataRequerimento) {
		this.dataRequerimento = dataRequerimento;
	}

	public LocalDate getDataEvento() {
		return dataEvento;
	}

	public void setDataEvento(LocalDate dataEvento) {
		this.dataEvento = dataEvento;
	}

	public LocalDate getDataAprovacao() {
		return dataAprovacao;
	}

	public void setDataAprovacao(LocalDate dataAprovacao) {
		this.dataAprovacao = dataAprovacao;
	}

	public StatusRequerimento getStatusRequerimento() {
		return statusRequerimento;
	}


	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public void setStatusRequerimento(StatusRequerimento statusRequerimento) {
		this.statusRequerimento = statusRequerimento;
	}


	public String getEmailResponsavel() {
		return emailResponsavel;
	}

	public void setEmailResponsavel(String emailResponsavel) {
		this.emailResponsavel = emailResponsavel;
	}

	public LocalDate getDataPagamento() {
		return dataPagamento;
	}

	
	
	public void setDataPagamento(LocalDate dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public String getPergunta1() {
		return pergunta1;
	}

	public void setPergunta1(String pergunta1) {
		this.pergunta1 = pergunta1;
	}

	public String getPergunta2() {
		return pergunta2;
	}

	public void setPergunta2(String pergunta2) {
		this.pergunta2 = pergunta2;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public BigDecimal getTotal() {
		return Total;
	}

	public void setTotal(BigDecimal total) {
		Total = total;
	}

	public List<ProdutoDTO> getProduto() {
		return produto;
	}

	public void setProduto(List<ProdutoDTO> produto) {
		this.produto = produto;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RequerimentoOrçamentoDTO other = (RequerimentoOrçamentoDTO) obj;
		return Objects.equals(id, other.id);
	} 
	
}
