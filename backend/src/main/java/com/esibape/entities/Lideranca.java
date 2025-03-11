package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

public class Lideranca implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private String email;
	private String cargo;
	
	public  Lideranca() {
		
	}

	public Lideranca(Long id, String nome, String email, String cargo) {
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

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
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
