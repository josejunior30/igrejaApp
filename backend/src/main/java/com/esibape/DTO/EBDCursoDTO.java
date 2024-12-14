package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;



import com.esibape.entities.Curso;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.EbdEstudos;
import com.esibape.entities.Membro;


public class EBDCursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
    private Curso curso;
	private List <EbdEstudosDTO> ebdEstudos = new ArrayList<>();
	private List<MembroDTO> membro = new ArrayList<>();

	public EBDCursoDTO() {
		
		
	}




	public void setCurso(Curso curso) {
		this.curso = curso;
	}




	public EBDCursoDTO(EBDCurso entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
		this.curso =entity.getCurso();
	
		
	}

	public EBDCursoDTO(EBDCurso entity, List<EbdEstudos> ebdEstudos , List<Membro>membro) {
	
		   this.ebdEstudos =ebdEstudos.stream()
		            .map(EbdEstudos-> new EbdEstudosDTO(EbdEstudos))  
		            .collect(Collectors.toList());
		   

		   this.membro =membro.stream()
		            .map(Membro-> new MembroDTO(Membro))  
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



	public List<EbdEstudosDTO> getEbdEstudos() {
		return ebdEstudos;
	}




	public List<MembroDTO> getMembro() {
		return membro;
	}




	public void setMembro(List<MembroDTO> membro) {
		this.membro = membro;
	}




	public void setEbdEstudos(List<EbdEstudosDTO> ebdEstudos) {
		this.ebdEstudos = ebdEstudos;
	}




	public Curso getCurso() {
		return curso;
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
		EBDCursoDTO other = (EBDCursoDTO) obj;
		return Objects.equals(id, other.id);
	}

	
	
	
}
