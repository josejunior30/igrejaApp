package com.esibape.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;



@Entity
@Table(name="tb_visitante")
public class Visitante {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String sobrenome;
	private Integer idade;
	private String email;
	private String telefone;
	private LocalDate dataNascimento;
	
	@ManyToOne()
	@JoinColumn(name= "curso_id")
	@JsonBackReference
    private Curso curso;
	
	@OneToMany(mappedBy = "visitante", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD = new ArrayList<>();
	
	public Visitante() {
		
		
	}


	


	public Visitante(Long id, String nome, String sobrenome, Integer idade, String email, String telefone,
			LocalDate dataNascimento, Curso curso, List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.idade = idade;
		this.email = email;
		this.telefone = telefone;
		this.dataNascimento = dataNascimento;
		this.curso = curso;
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
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


	
	public Integer getIdade() {
		return idade;
	}


	public void setIdade(Integer idade) {
		this.idade = idade;
	}


	public String getEmail() {
		return email;
	}


	public String getSobrenome() {
		return sobrenome;
	}


	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public LocalDate getDataNascimento() {
		return dataNascimento;
	}


	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}


	public Curso getCurso() {
		return curso;
	}


	public List<ListaPresencaVisitanteEBD> getListaPresencaVisitanteEBD() {
		return listaPresencaVisitanteEBD;
	}





	public void setListaPresencaVisitanteEBD(List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD) {
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
	}





	public void setCurso(Curso curso) {
		this.curso = curso;
	}


	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
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
		Visitante other = (Visitante) obj;
		return Objects.equals(id, other.id);
	}

	
	

}
