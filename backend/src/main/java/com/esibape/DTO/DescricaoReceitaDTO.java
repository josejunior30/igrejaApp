package com.esibape.DTO;

import java.io.Serializable;

import com.esibape.entities.DescricaoReceita;


public class DescricaoReceitaDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	  private Long id;
	    private String descricao;
	  
	    public DescricaoReceitaDTO() {
			
			
	}

	public DescricaoReceitaDTO(DescricaoReceita entity) {
		
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
	
	
	
}