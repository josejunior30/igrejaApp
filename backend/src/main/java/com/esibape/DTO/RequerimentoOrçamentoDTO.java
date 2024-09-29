package com.esibape.DTO;

import java.io.Serializable;
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
	private LocalDate DataRequerimento;
	private LocalDate DataEvento;
	private LocalDate DataAprovação;
	private StatusRequerimento statusRequerimento;
	private LocalDate DataPagamento;
	@JsonProperty("O QUE VAI SER FEITO?")
	private String pergunta1;
	@JsonProperty("QUAL MOTIVO DE SER FEITO?")
	private String pergunta2;
	private String responsavel;
	private String local; 
	private Double Total;

	private List<ProdutoDTO> produto = new ArrayList<>();
	
	public RequerimentoOrçamentoDTO(){
		
	}

	public Long getId() {
		return id;
	}

	
	public RequerimentoOrçamentoDTO(RequerimentoOrçamento entity) {
	
		id = entity.getId();
		DataRequerimento = entity.getDataRequerimento();
		DataEvento = entity.getDataEvento();
		DataAprovação = entity.getDataAprovação();
		statusRequerimento = entity.getStatusRequerimento();
		DataPagamento = entity.getDataPagamento();
		pergunta1 = entity.getPergunta1();
		pergunta2 = entity.getPergunta2();
		responsavel = entity.getResponsavel();
		local = entity.getLocal();
		Total = entity.getTotal();
		
	}
	public RequerimentoOrçamentoDTO(RequerimentoOrçamento entity,List<Produto> produto ) {
		this(entity);
		produto.forEach(x-> this.produto.add(new ProdutoDTO(x)));
		
	}
	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDataRequerimento() {
		return DataRequerimento;
	}

	public void setDataRequerimento(LocalDate dataRequerimento) {
		DataRequerimento = dataRequerimento;
	}

	public LocalDate getDataEvento() {
		return DataEvento;
	}

	public void setDataEvento(LocalDate dataEvento) {
		DataEvento = dataEvento;
	}

	public LocalDate getDataAprovação() {
		return DataAprovação;
	}

	public void setDataAprovação(LocalDate dataAprovação) {
		DataAprovação = dataAprovação;
	}

	public StatusRequerimento getStatusRequerimeento() {
		return statusRequerimento;
	}

	public void setStatusRequerimeento(StatusRequerimento statusRequerimeento) {
		this.statusRequerimento = statusRequerimeento;
	}

	public LocalDate getDataPagamento() {
		return DataPagamento;
	}

	public void setDataPagamento(LocalDate dataPagamento) {
		DataPagamento = dataPagamento;
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

	public Double getTotal() {
		return Total;
	}

	public void setTotal(Double total) {
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
