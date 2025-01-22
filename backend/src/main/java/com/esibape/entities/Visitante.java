package com.esibape.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;




@Entity
@Table(name="tb_visitante")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
	private Boolean apostila = false;

	@ManyToMany
	@JoinTable(name="tb_ebd_curso_visitante", joinColumns = 
	@JoinColumn(name= "visitante_id"), inverseJoinColumns = @JoinColumn(name="ebd_curso_id"))
	Set<EBDCurso>ebdCursoVisitante = new HashSet<>();
	
	
    @Column(name="opcao_curso")
	private String opcaoCurso;
	
	@OneToMany(mappedBy = "visitante", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD = new ArrayList<>();
	
	public Visitante() {
		
		
	}


	public Visitante(Long id, String nome, String sobrenome, Integer idade, String email, String telefone,
			LocalDate dataNascimento, Boolean apostila, Set<EBDCurso> ebdCursoVisitante, String opcaoCurso,
			List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.idade = idade;
		this.email = email;
		this.telefone = telefone;
		this.dataNascimento = dataNascimento;
		this.apostila = apostila;
		this.ebdCursoVisitante = ebdCursoVisitante;
		this.opcaoCurso = opcaoCurso;
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
	}




	public Set<EBDCurso> getEbdCursoVisitante() {
		return ebdCursoVisitante;
	}


	public void setEbdCursoVisitante(Set<EBDCurso> ebdCursoVisitante) {
		this.ebdCursoVisitante = ebdCursoVisitante;
	}


	public Boolean getApostila() {
		return apostila;
	}


	public void setApostila(Boolean apostila) {
		this.apostila = apostila;
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


	public String getOpcaoCurso() {
		return opcaoCurso;
	}


	public void setOpcaoCurso(String opcaoCurso) {
		this.opcaoCurso = opcaoCurso;
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




	public List<ListaPresencaVisitanteEBD> getListaPresencaVisitanteEBD() {
		return listaPresencaVisitanteEBD;
	}





	public void setListaPresencaVisitanteEBD(List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD) {
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
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
