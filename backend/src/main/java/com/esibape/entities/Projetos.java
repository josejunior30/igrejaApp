package com.esibape.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name = "tb_projetos")
public class Projetos implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String lider;
	private String coordenador;
	private String foto_coordenador;
	private String foto_lider;
	private String foto_fundo;
	
	@OneToMany(mappedBy ="projetos" )
	private List<Alunos>alunos = new ArrayList<>();
	
	@OneToMany(mappedBy ="projetosChamada")
	private List <Chamada> chamada = new ArrayList<>();
	
	@OneToMany(mappedBy ="projetosRelatorio" )
	private List<Relatorio>relatorio = new ArrayList<>();
	
	
	
	public Projetos() {
		
	}



	public Projetos(Long id, String nome, String lider, String coordenador, String foto_coordenador, String foto_lider, String foto_fundo,
			List<Alunos> alunos, List<Chamada> chamada, List<Relatorio> relatorio) {
		super();
		this.id = id;
		this.nome = nome;
		this.lider = lider;
		this.coordenador = coordenador;
		this.foto_coordenador = foto_coordenador;
		this.foto_lider = foto_lider;
		this.foto_fundo = foto_fundo;
		this.alunos = alunos;
		this.chamada = chamada;
		this.relatorio = relatorio;
		
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

	public String getLider() {
		return lider;
	}

	public void setLider(String lider) {
		this.lider = lider;
	}
	
	
	public String getFoto_fundo() {
		return foto_fundo;
	}



	public void setFoto_fundo(String foto_fundo) {
		this.foto_fundo = foto_fundo;
	}



	public List<Chamada> getChamada() {
		return chamada;
	}

	public void setChamada(List<Chamada> chamada) {
		this.chamada = chamada;
	}
	
	public List<Relatorio> getRelatorio() {
		return relatorio;
	}

	public void setRelatorio(List<Relatorio> relatorio) {
		this.relatorio = relatorio;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	
	public List<Alunos> getAlunos() {
		return alunos;
	}
	
	

	public String getCoordenador() {
		return coordenador;
	}

	public void setCoordenador(String coordenador) {
		this.coordenador = coordenador;
	}

	public void setAlunos(List<Alunos> alunos) {
		this.alunos = alunos;
	}
	
	
	public String getFoto_coordenador() {
		return foto_coordenador;
	}

	public void setFoto_coordenador(String foto_coordenador) {
		this.foto_coordenador = foto_coordenador;
	}

	public String getFoto_lider() {
		return foto_lider;
	}

	public void setFoto_lider(String foto_lider) {
		this.foto_lider = foto_lider;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Projetos other = (Projetos) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
