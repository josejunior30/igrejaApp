package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name="tb_relatorio")
public class Relatorio implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate data;
	
	@Column(columnDefinition = "TEXT")
	private String pergunta1;
    private String pergunta2; 
    private String pergunta3; 
    private String pergunta4;
    private String pergunta5;
	
	
	
	@ManyToOne()
	@JoinColumn(name = "projeto_id")
	private Projetos projetosRelatorio;
	
	public Relatorio() {
		
	}

	

	public Relatorio(Long id, LocalDate data, String pergunta1, String pergunta2, String pergunta3, String pergunta4,
			String pergunta5, Projetos projetosRelatorio) {
		super();
		this.id = id;
		this.data = data;
		this.pergunta1 = pergunta1;
		this.pergunta2 = pergunta2;
		this.pergunta3 = pergunta3;
		this.pergunta4 = pergunta4;
		this.pergunta5 = pergunta5;
		this.projetosRelatorio = projetosRelatorio;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
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



	public String getPergunta3() {
		return pergunta3;
	}



	public void setPergunta3(String pergunta3) {
		this.pergunta3 = pergunta3;
	}



	public String getPergunta4() {
		return pergunta4;
	}



	public void setPergunta4(String pergunta4) {
		this.pergunta4 = pergunta4;
	}



	public String getPergunta5() {
		return pergunta5;
	}



	public void setPergunta5(String pergunta5) {
		this.pergunta5 = pergunta5;
	}



	public Projetos getProjetosRelatorio() {
		return projetosRelatorio;
	}

	public void setProjetosRelatorio(Projetos projetosRelatorio) {
		this.projetosRelatorio = projetosRelatorio;
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
		Relatorio other = (Relatorio) obj;
		return Objects.equals(id, other.id);
	}

	
	
}
