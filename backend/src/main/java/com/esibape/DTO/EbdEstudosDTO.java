package com.esibape.DTO;

import java.io.Serializable;
import java.util.Objects;

import com.esibape.entities.EBDCurso;
import com.esibape.entities.EbdEstudos;


public class EbdEstudosDTO implements Serializable{

	private static final long serialVersionUID = 1L;


    private Long id;
    private String nome;
    private EBDCurso ebdCurso;
    
    public EbdEstudosDTO() {
    	
    	
    }


	public EbdEstudosDTO(Long id, String nome, EBDCurso ebdCurso) {
		super();
		this.id = id;
		this.nome = nome;
		this.ebdCurso = ebdCurso;
	}






	public EbdEstudosDTO(EbdEstudos entity) {
		
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.ebdCurso = entity.getEbdCurso();
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


	public EBDCurso getEbdCurso() {
		return ebdCurso;
	}


	public void setEbdCurso(EBDCurso ebdCurso) {
		this.ebdCurso = ebdCurso;
	}


	public long getSerialVersionUID() {
		return serialVersionUID;
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
		EbdEstudosDTO other = (EbdEstudosDTO) obj;
		return Objects.equals(id, other.id);
	}
    
    
}