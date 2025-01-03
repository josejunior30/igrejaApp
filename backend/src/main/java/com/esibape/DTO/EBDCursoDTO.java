package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.EbdEstudos;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;
import com.esibape.entities.Visitante;
import com.fasterxml.jackson.annotation.JsonIgnore;


public class EBDCursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
    private CursoDTO curso;
	private List <EbdEstudosDTO> ebdEstudos = new ArrayList<>();
	private List<MembroDTO> membro = new ArrayList<>();
	private List<VisitanteDTO> visitante = new ArrayList<>();
	@JsonIgnore
	private List<ListaPresencaEBDDTO> listaPresencaEBD = new ArrayList<>();
	public EBDCursoDTO() {
		
		
	}

	public void setCurso(CursoDTO curso) {
		this.curso = curso;
	}




	public EBDCursoDTO(EBDCurso entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
	    this.curso = new CursoDTO(entity.getCurso());
	
		
	}

	public EBDCursoDTO(EBDCurso entity, List<EbdEstudos> ebdEstudos , List<Membro>membro, List<Visitante>visitante, List<ListaPresencaEBD> listaPresencaEBD) {
		 this(entity);
		   this.ebdEstudos =ebdEstudos.stream()
		            .map(EbdEstudos-> new EbdEstudosDTO(EbdEstudos))  
		            .collect(Collectors.toList());
		   

		   this.membro =membro.stream()
		            .map(Membro-> new MembroDTO(Membro))  
		            .collect(Collectors.toList());
		 

		   this.visitante =visitante.stream()
		            .map(Visitante-> new VisitanteDTO(Visitante))  
		            .collect(Collectors.toList());
		   
		   this.listaPresencaEBD = listaPresencaEBD.stream()
		            .map(ListaPresencaEBD -> new ListaPresencaEBDDTO(ListaPresencaEBD)) 
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


	public List<ListaPresencaEBDDTO> getListaPresencaEBD() {
		return listaPresencaEBD;
	}

	public void setListaPresencaEBD(List<ListaPresencaEBDDTO> listaPresencaEBD) {
		this.listaPresencaEBD = listaPresencaEBD;
	}

	public List<VisitanteDTO> getVisitante() {
		return visitante;
	}

	public void setVisitante(List<VisitanteDTO> visitante) {
		this.visitante = visitante;
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



	public CursoDTO getCurso() {
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
