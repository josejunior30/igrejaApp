package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_lideranca")
public class Lideranca implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String email;
	 @Enumerated(EnumType.STRING)
	private Cargo cargo;
	
	public  Lideranca() {
		
	}

	

	public Lideranca(Long id, String nome, String email, Cargo cargo) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.cargo = cargo;
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
		Lideranca other = (Lideranca) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
