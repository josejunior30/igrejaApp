package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import com.esibape.entities.ChamadaVisitante;
import com.esibape.entities.Curso;
import com.esibape.entities.ListaPresencaVisitanteEBD;
import com.esibape.entities.Visitante;


public class ListaPresencaVisitanteEBDDTO implements Serializable{
	private static final long serialVersionUID = 1L;
		
	private Long id;
	private LocalDate data; 
	private VisitanteDTO visitante;
	private CursoDTO curso; 

	    private ChamadaVisitante chamadaVisitante; 
	ListaPresencaVisitanteEBDDTO(){
		
	}

	public ListaPresencaVisitanteEBDDTO(ListaPresencaVisitanteEBD entity) {
		
		this.id = entity.getId();
		this.data = entity.getData();
		this.chamadaVisitante = entity.getChamadaVisitante();
	}
	
	public ListaPresencaVisitanteEBDDTO(ListaPresencaVisitanteEBD entity, Visitante visitante, Curso curso) {
		this(entity);
		this.visitante = new VisitanteDTO(visitante);
		this.curso = new CursoDTO(curso);

	}



	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public LocalDate getData() {
		return data;
	}


	public void setData(LocalDate data) {
		this.data = data;
	}




	public CursoDTO getCurso() {
		return curso;
	}



	public void setCurso(CursoDTO curso) {
		this.curso = curso;
	}


	public ChamadaVisitante getChamadaVisitante() {
		return chamadaVisitante;
	}


	public void setChamadaVisitante(ChamadaVisitante chamadaVisitante) {
		this.chamadaVisitante = chamadaVisitante;
	}


	public VisitanteDTO getVisitante() {
		return visitante;
	}


	public void setVisitante(VisitanteDTO visitante) {
		this.visitante = visitante;
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
		ListaPresencaVisitanteEBDDTO other = (ListaPresencaVisitanteEBDDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
	