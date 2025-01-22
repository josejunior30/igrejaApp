package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import com.esibape.entities.Curso;
import com.esibape.entities.EBDCurso;




public class CursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	private String url;
	private String resumo;
	private List<VisitanteDTO> visitante = new ArrayList<>();
	private List <EBDCursoDTO> ebdCurso = new ArrayList<>();

	
	public CursoDTO() {
			
			
	}

	
	public CursoDTO(Long id, String nome, String url, String resumo,
			List<VisitanteDTO> visitante, List<EBDCursoDTO> ebdCurso) {
		super();
		this.id = id;
		this.nome = nome;
		this.url = url;
		this.resumo = resumo;
		this.visitante = visitante;
		this.ebdCurso = ebdCurso;
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
		this.resumo=entity.getResumo();
		
	}
	
	   public CursoDTO(Curso curso, List<EBDCurso> ebdCurso) {
	        this.id = curso.getId();
	        this.nome = curso.getNome();
	        this.resumo=curso.getResumo();
	        this.url =curso.getUrl();
	        this.ebdCurso = ebdCurso.stream()
		            .map(EBDCurso-> new EBDCursoDTO(EBDCurso)) 
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


	public String getResumo() {
		return resumo;
	}


	public void setResumo(String resumo) {
		this.resumo = resumo;
	}




	public List<VisitanteDTO> getVisitante() {
		return visitante;
	}




	public void setVisitante(List<VisitanteDTO> visitante) {
		this.visitante = visitante;
	}



	public List<EBDCursoDTO> getEbdCurso() {
		return ebdCurso;
	}


	public void setEbdCurso(List<EBDCursoDTO> ebdCurso) {
		this.ebdCurso = ebdCurso;
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
