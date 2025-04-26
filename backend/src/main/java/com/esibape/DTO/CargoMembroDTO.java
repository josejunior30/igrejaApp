package com.esibape.DTO;

import java.io.Serializable;

import com.esibape.entities.CargoMembro;

public class CargoMembroDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	  private Long id;
		private String nome;

	  
	    public CargoMembroDTO() {
			
			
	}

	public CargoMembroDTO(CargoMembro entity) {
		
		this.id=entity.getId();
		nome= entity.getNome();
		

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

	
}

