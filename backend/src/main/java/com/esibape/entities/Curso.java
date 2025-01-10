package com.esibape.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="tb_curso")
public class Curso implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String url;
	@Column(columnDefinition = "TEXT")
	private String resumo;
	@OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    private List<Membro> membro = new ArrayList<>();

	@OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    private List<Visitante> visitante = new ArrayList<>();
	
	@OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference(value = "curso-ebdcurso")
	private List <EBDCurso> ebdCurso = new ArrayList<>();
	public Curso() {
		
		
	}


	public Curso(Long id, String nome, String url, String resumo, List<Membro> membro, List<Visitante> visitante,
			List<EBDCurso> ebdCurso) {
		super();
		this.id = id;
		this.nome = nome;
		this.url = url;
		this.resumo = resumo;
		this.membro = membro;
		this.visitante = visitante;
		this.ebdCurso = ebdCurso;
	}




	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}



	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}



	public List<Membro> getMembro() {
		return membro;
	}


	public List<EBDCurso> getEbdCurso() {
		return ebdCurso;
	}




	public String getResumo() {
		return resumo;
	}


	public void setResumo(String resumo) {
		this.resumo = resumo;
	}


	public void setEbdCurso(List<EBDCurso> ebdCurso) {
		this.ebdCurso = ebdCurso;
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
		Curso other = (Curso) obj;
		return Objects.equals(id, other.id);
	}

	
	
	
}
