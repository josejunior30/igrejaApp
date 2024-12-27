package com.esibape.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name="tb_EBD_curso")
public class EBDCurso implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	
	@ManyToOne()
	@JoinColumn(name= "curso_id")
	@JsonBackReference(value = "curso-ebdcurso")
    private Curso curso;
	
	@OneToMany(mappedBy = "ebdCurso")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Membro> membro = new ArrayList<>();
	
	@OneToMany(mappedBy = "ebdCursoVisitante")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Visitante> visitante = new ArrayList<>();

	
	@OneToMany(mappedBy ="ebdCurso")
	@JsonIgnore
	private List <EbdEstudos> ebdEstudos = new ArrayList<>();
	
	public EBDCurso() {
		
		
	}



	public EBDCurso(Long id, String nome, Curso curso, List<Membro> membro, List<Visitante> visitante,
			List<EbdEstudos> ebdEstudos) {
		super();
		this.id = id;
		this.nome = nome;
		this.curso = curso;
		this.membro = membro;
		this.visitante = visitante;
		this.ebdEstudos = ebdEstudos;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}




	public Curso getCurso() {
		return curso;
	}


	public void setCurso(Curso curso) {
		this.curso = curso;
	}




	public List<EbdEstudos> getEbdEstudos() {
		return ebdEstudos;
	}


	public void setEbdEstudos(List<EbdEstudos> ebdEstudos) {
		this.ebdEstudos = ebdEstudos;
	}


	public List<Membro> getMembro() {
		return membro;
	}





	public void setMembro(List<Membro> membro) {
		this.membro = membro;
	}



	public List<Visitante> getVisitante() {
		return visitante;
	}



	public void setVisitante(List<Visitante> visitante) {
		this.visitante = visitante;
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
		EBDCurso other = (EBDCurso) obj;
		return Objects.equals(id, other.id);
	}

	
	
	
}
