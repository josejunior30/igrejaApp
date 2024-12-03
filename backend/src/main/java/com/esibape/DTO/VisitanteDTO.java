package com.esibape.DTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import com.esibape.entities.Curso;
import com.esibape.entities.ListaPresencaVisitanteEBD;
import com.esibape.entities.Visitante;

public class VisitanteDTO {
		private Long id;
		private String nome;
		private String sobrenome;
		private Integer idade;
		private String email;
		private String telefone;
		private LocalDate dataNascimento;
	    private Curso curso;
	    private List<ListaPresencaVisitanteEBDDTO> listaPresencaVisitanteEBD = new ArrayList<>();
		
	public VisitanteDTO() {
			
			
		}
	



	public VisitanteDTO(Long id, String nome, String sobrenome, Integer idade, String email, String telefone,
			LocalDate dataNascimento, Curso curso, List<ListaPresencaVisitanteEBDDTO> listaPresencaVisitanteEBD) {
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




	public VisitanteDTO(Visitante entity) {
		this.id= entity.getId();
		this.nome= entity.getNome();
		this.sobrenome =entity.getSobrenome();
		this.dataNascimento = entity.getDataNascimento();
		this.email = entity.getEmail();
		this.telefone=entity.getTelefone();
		this.idade = entity.getIdade();
		
	}
	public VisitanteDTO(Visitante entity, List<ListaPresencaVisitanteEBD>listaPresencaVisitanteEBD) {
		 this(entity);
		  if (listaPresencaVisitanteEBD !=null) {
			  listaPresencaVisitanteEBD.forEach(pg-> this.listaPresencaVisitanteEBD.add(new ListaPresencaVisitanteEBDDTO(pg)));
	        }
		
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
	

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
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

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}


	public List<ListaPresencaVisitanteEBDDTO> getListaPresencaVisitanteEBD() {
		return listaPresencaVisitanteEBD;
	}

	public void setListaPresencaVisitanteEBD(List<ListaPresencaVisitanteEBDDTO> listaPresencaVisitanteEBD) {
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
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
		VisitanteDTO other = (VisitanteDTO) obj;
		return Objects.equals(id, other.id);
	}

	
	}
