package com.esibape.DTO;

import java.io.Serializable;
import java.util.Objects;

import com.esibape.entities.Cargo;
import com.esibape.entities.Lideranca;




public class LiderancaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String email;
	private Cargo cargo;
	
	
	public LiderancaDTO() {
			
			
	}



	public LiderancaDTO(Lideranca entity) {
		id= entity.getId();
		nome=entity.getNome();
		email=entity.getEmail();
		cargo=entity.getCargo();
	
		
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



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}


	
	public Cargo getCargo() {
		return cargo;
	}



	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
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
		LiderancaDTO other = (LiderancaDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
}
