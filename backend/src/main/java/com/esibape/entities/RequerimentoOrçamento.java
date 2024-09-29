package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="tb_requerimento")
public class RequerimentoOrçamento implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	private LocalDate DataRequerimento;
	private LocalDate DataEvento;
	private LocalDate DataAprovação;
	private StatusRequerimento statusRequerimento;
	private LocalDate DataPagamento;
	private String pergunta1;
	private String pergunta2;
	private String responsavel;
	private String local;
	private Double Total;
	
	@OneToMany(mappedBy = "requerimento", cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Produto> produto = new ArrayList<>();
	
	
	public RequerimentoOrçamento(){
		
	} 


	public RequerimentoOrçamento(Long id, LocalDate dataRequerimento, LocalDate dataEvento, LocalDate dataAprovação,
			StatusRequerimento statusRequerimento, LocalDate dataPagamento, String pergunta1, String pergunta2,
			 String responsavel, String local, List<Produto> produto) {
		super();
		this.id = id;
		DataRequerimento = dataRequerimento;
		DataEvento = dataEvento;
		DataAprovação = dataAprovação;
		this.statusRequerimento = statusRequerimento;
		DataPagamento = dataPagamento;
		this.pergunta1 = pergunta1;
		this.pergunta2 = pergunta2;
		this.responsavel = responsavel;
		this.local = local;
		this.produto = produto;
	}

	public void addProduto(Produto produto) {
	    produto.setRequerimento(this); 
	    this.produto.add(produto);
	}
	public Long getId() {
		return id;
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

	public LocalDate getDataPagamento() {
		return DataPagamento;
	}

	public LocalDate getDataEvento() {
		return DataEvento;
	}



	public LocalDate getDataAprovação() {
		return DataAprovação;
	}




	public void setDataAprovação(LocalDate dataAprovação) {
		DataAprovação = dataAprovação;
	}




	public StatusRequerimento getStatusRequerimento() {
		return statusRequerimento;
	}




	public void setStatusRequerimeento(StatusRequerimento statusRequerimento) {
		this.statusRequerimento = statusRequerimento;
	}


	public Double getTotal() {
		return produto.stream()
				.mapToDouble(Produto::getPreço) 
				.sum();
	}



	public List<Produto> getProduto() {
		return produto;
	}


	public void setProduto(List<Produto> produto) {
		this.produto = produto;
	}


	public void setDataEvento(LocalDate dataEvento) {
		DataEvento = dataEvento;
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
		RequerimentoOrçamento other = (RequerimentoOrçamento) obj;
		return Objects.equals(id, other.id);
	}
	
}
