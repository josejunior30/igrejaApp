package com.esibape.DTO;

import java.io.Serializable;
import java.util.Objects;
import com.esibape.entities.EbdEstudos;


public class EbdEstudosDTO implements Serializable{

	private static final long serialVersionUID = 1L;


    private Long id;
    private String nome;
    private Long cursoId; 
    public EbdEstudosDTO() {
    	
    	
    }


	public EbdEstudosDTO(Long id, String nome, Long cursoId) {
		super();
		this.id = id;
		this.nome = nome;
		this.cursoId =cursoId;
	}






	public EbdEstudosDTO(EbdEstudos entity) {
		
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.cursoId = entity.getEbdCurso().getId();
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





	public Long getCursoId() {
		return cursoId;
	}


	public void setCursoId(Long cursoId) {
		this.cursoId = cursoId;
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