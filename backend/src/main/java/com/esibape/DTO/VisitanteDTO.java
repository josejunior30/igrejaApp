package com.esibape.DTO;

import java.util.Objects;

import com.esibape.entities.PequenoGrupo;
import com.esibape.entities.Visitante;

public class VisitanteDTO {
		private Long id;
		private String nome;
		private String sobrenome;
		private String sexo;
		private String telefone;
		
		private PequenoGrupoDTO pequenoGrupo;
		
	public VisitanteDTO() {
			
			
		}
	
	public VisitanteDTO(Long id, String nome, String sobrenome, String sexo, String telefone) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.sexo = sexo;
		
	}
	public VisitanteDTO(Visitante entity) {
		this.id= entity.getId();
		this.nome= entity.getNome();
		this.sobrenome= entity.getSobrenome();
		this.sexo= entity.getSexo();
		this.telefone=entity.getTelefone();
		
	}
	public VisitanteDTO(Visitante entity, PequenoGrupo pequenoGrupo ) {
		this(entity);
		this.pequenoGrupo = new PequenoGrupoDTO(pequenoGrupo);
		
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
	
	public String getSexo() {
		return sexo;
	}
	
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public PequenoGrupoDTO getPequenoGrupo() {
		return pequenoGrupo;
	}

	public void setPequenoGrupo(PequenoGrupoDTO pequenoGrupo) {
		this.pequenoGrupo = pequenoGrupo;
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
		VisitanteDTO other = (VisitanteDTO) obj;
		return Objects.equals(id, other.id);
	}

	
	}
