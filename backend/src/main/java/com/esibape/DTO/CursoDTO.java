package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.esibape.entities.Curso;
import com.esibape.entities.Inscricao;
import com.esibape.entities.Membro;

public class CursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	private List<MembroDTO> membro = new ArrayList<>();
	  
	public CursoDTO() {
			
			
	}
	
	


	public CursoDTO(Long id, String nome, List<MembroDTO> membro) {
		super();
		this.id = id;
		this.nome = nome;
		this.membro = membro;
	}




	public CursoDTO(Curso entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
		
	}
	
	   public CursoDTO(Curso curso, List<Membro> membro) {
	        this.id = curso.getId();
	        this.nome = curso.getNome();
	        this.membro = membro.stream()
	            .map(Membro -> new MembroDTO(Membro))  // Mapeando para um DTO de inscrição
	            .collect(Collectors.toList());
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




	public List<MembroDTO> getMembro() {
		return membro;
	}




	public void setMembro(List<MembroDTO> membro) {
		this.membro = membro;
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
		CursoDTO other = (CursoDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
}
