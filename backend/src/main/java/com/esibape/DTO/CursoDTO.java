package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import com.esibape.entities.Curso;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;
import com.esibape.entities.Visitante;
import com.fasterxml.jackson.annotation.JsonBackReference;

public class CursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	private String url;
	private List<MembroDTO> membro = new ArrayList<>();
	private List<VisitanteDTO> visitante = new ArrayList<>();

	private List <ListaPresencaEBDDTO> listaPresencaEBD = new ArrayList<>();
	public CursoDTO() {
			
			
	}
	
	

	public CursoDTO(Long id, String nome, String url, List<MembroDTO> membro, List<VisitanteDTO> visitante, List<ListaPresencaEBDDTO> listaPresencaEBD) {
		super();
		this.id = id;
		this.nome = nome;
		this.url= url;
		this.membro = membro;
		this.visitante = visitante;
		this.listaPresencaEBD= listaPresencaEBD;
	}







	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}



	public CursoDTO(Curso entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
		this.url=entity.getUrl();
		;
	}
	
	   public CursoDTO(Curso curso, List<Membro> membro, List<Visitante> visitante, List<ListaPresencaEBD> listaPresencaEBD) {
	        this.id = curso.getId();
	        this.nome = curso.getNome();
	        this.url =curso.getUrl();
	        this.membro = membro.stream()
	            .map(Membro -> new MembroDTO(Membro))  
	            .collect(Collectors.toList());
	        this.visitante = visitante.stream()
		            .map(Visitante -> new VisitanteDTO(Visitante)) 
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




	public List<MembroDTO> getMembro() {
		return membro;
	}




	public List<VisitanteDTO> getVisitante() {
		return visitante;
	}







	public void setVisitante(List<VisitanteDTO> visitante) {
		this.visitante = visitante;
	}







	public void setMembro(List<MembroDTO> membro) {
		this.membro = membro;
	}




	public List<ListaPresencaEBDDTO> getListaPresencaEBD() {
		return listaPresencaEBD;
	}



	public void setListaPresencaEBD(List<ListaPresencaEBDDTO> listaPresencaEBD) {
		this.listaPresencaEBD = listaPresencaEBD;
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
