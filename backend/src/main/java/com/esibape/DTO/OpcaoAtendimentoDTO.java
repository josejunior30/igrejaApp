package com.esibape.DTO;

import java.io.Serializable;
import java.util.Objects;

import com.esibape.entities.OpcaoAtendimento;

public class OpcaoAtendimentoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long id;
	private String descricao;
	  
	public OpcaoAtendimentoDTO() {
			
			
	}

	public OpcaoAtendimentoDTO(OpcaoAtendimento entity) {
		
		this.id=entity.getId();
		descricao= entity.getDescricao();
		

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
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
		OpcaoAtendimentoDTO other = (OpcaoAtendimentoDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
}