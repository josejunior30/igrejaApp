package com.esibape.DTO;

import java.io.Serializable;
import com.esibape.entities.MaterialObra;
import com.esibape.entities.Servico;




public class MaterialObraDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	   private Long id;

	    private String nome;

	    private Boolean checkInConfirmado = false;

	
	public MaterialObraDTO() {
			
			
	}



	public MaterialObraDTO(MaterialObra entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
		  this.checkInConfirmado = entity.getCheckInConfirmado() != null ? entity.getCheckInConfirmado() : false;
		
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






	public Boolean getCheckInConfirmado() {
		return checkInConfirmado;
	}



	  public void setCheckInConfirmado(Boolean checkInConfirmado) {
	        this.checkInConfirmado = checkInConfirmado != null ? checkInConfirmado : false;
	    }



	public void setNome(String nome) {
		this.nome = nome;
	}



	
	
}