package com.esibape.entities;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="tb_lista_presenca")
public class Chamada implements Serializable{
	private static final long serialVersionUID = 1L;
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate data; 
	private ChamadaAluno chamadaAluno;
	
	@ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
	private Alunos alunos ;
	
	@ManyToOne
	@JoinColumn(name= "projeto_id")
	private Projetos projetosChamada; 
	
	public Chamada() {
		
	}

	public Chamada(Long id, LocalDate data, ChamadaAluno chamadaAluno, Alunos alunos, Projetos projetosChamada) {
		super();
		this.id = id;
		this.data = data;
		this.chamadaAluno = chamadaAluno;
		this.alunos = alunos;
		this.projetosChamada= projetosChamada;
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

	public ChamadaAluno getChamadaAluno() {
		return chamadaAluno;
	}

	public void setChamadaAluno(ChamadaAluno chamadaAluno) {
		this.chamadaAluno = chamadaAluno;
	}
	


	public Alunos getAlunos() {
		return alunos;
	}

	public void setAlunos(Alunos alunos) {
		this.alunos = alunos;
	}
	
	
	


	public Projetos getProjetosChamada() {
		return projetosChamada;
	}

	public void setProjetosChamada(Projetos projetosChamada) {
		this.projetosChamada = projetosChamada;
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
		Chamada other = (Chamada) obj;
		return Objects.equals(id, other.id);
	} 
	
	
	
}
