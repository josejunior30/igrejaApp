package com.esibape.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.esibape.DTO.VisitanteDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_pequenoGrupo")
public class PequenoGrupo implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String apelido;
	private String lider;
	
	@OneToMany(mappedBy = "pequenoGrupo")
	private List<Membro> membros = new ArrayList<>();
	@OneToMany(mappedBy ="pequenoGrupo" )
	private List<Visitante>visitantes = new ArrayList<>();
	
	public PequenoGrupo() {
		
	}

	public PequenoGrupo(Long id, String nome, String apelido, String lider, List<Membro>membros, List<Visitante>visitantes) {
		super();
		this.id = id;
		this.nome = nome;
		this.apelido = apelido;
		this.lider = lider;
		this.membros= membros;
		this.visitantes= visitantes;
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

	public String getApelido() {
		return apelido;
	}

	public void setApelido(String apelido) {
		this.apelido = apelido;
	}
	
	
	public List<Membro> getMembros() {
		return membros;
	}


	public String getLider() {
		return lider;
	}

	public void setLider(String lider) {
		this.lider = lider;
	}
	
	public List<Visitante> getVisitantes() {
		return visitantes;
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
		PequenoGrupo other = (PequenoGrupo) obj;
		return Objects.equals(id, other.id);
	}

	public void setVisitantes(List<VisitanteDTO> visitantes2) {
		// TODO Auto-generated method stub
		
	}

	
}
