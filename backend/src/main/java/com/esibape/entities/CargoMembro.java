package com.esibape.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name= "tb_cargo")
public class CargoMembro implements Serializable{
	 
	private static final long serialVersionUID = 1L;

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id;
	private String nome;
	@ManyToMany(mappedBy = "cargoMembro")
    private  Set<Membro> membroCargo = new HashSet<>(); 
	
	public  CargoMembro() {
		
		
	}

	public CargoMembro(Long id, String nome, Set<Membro> membroCargo) {
		super();
		this.id = id;
		this.nome = nome;
		this.membroCargo = membroCargo;
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

	

	
	public Set<Membro> getMembroCargo() {
		return membroCargo;
	}

	public void setMembroCargo(Set<Membro> membroCargo) {
		this.membroCargo = membroCargo;
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
		CargoMembro other = (CargoMembro) obj;
		return Objects.equals(id, other.id);
	}
	
	

}
