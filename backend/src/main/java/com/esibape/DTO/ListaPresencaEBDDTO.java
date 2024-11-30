package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.esibape.entities.ChamadaAluno;
import com.esibape.entities.ChamadaMembro;
import com.esibape.entities.ChamadaVisitante;
import com.esibape.entities.Curso;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;
import com.esibape.entities.Visitante;


public class ListaPresencaEBDDTO implements Serializable{
	private static final long serialVersionUID = 1L;
		
	private Long id;
	private LocalDate data; 
	private ChamadaAluno chamadaAluno;

    private ChamadaAluno chamadaAlunoMembro; 

  
    private ChamadaAluno chamadaAlunoVisitante; 
	private MembroDTO membro ;
	private VisitanteDTO visitante;
	private CursoDTO curso; 
	  private ChamadaMembro chamadaMembro; 
	    private ChamadaVisitante chamadaVisitante; 
	ListaPresencaEBDDTO(){
		
	}




	public ChamadaAluno getChamadaAlunoMembro() {
		return chamadaAlunoMembro;
	}


	public void setChamadaAlunoMembro(ChamadaAluno chamadaAlunoMembro) {
		this.chamadaAlunoMembro = chamadaAlunoMembro;
	}


	public ChamadaAluno getChamadaAlunoVisitante() {
		return chamadaAlunoVisitante;
	}




	public void setChamadaAlunoVisitante(ChamadaAluno chamadaAlunoVisitante) {
		this.chamadaAlunoVisitante = chamadaAlunoVisitante;
	}




	public ListaPresencaEBDDTO(ListaPresencaEBD entity) {
		
		this.id = entity.getId();
		this.data = entity.getData();
		this.chamadaMembro = entity.getChamadaMembro();
		this.chamadaVisitante = entity.getChamadaVisitante();
	}
	public ListaPresencaEBDDTO(ListaPresencaEBD entity, Membro membro, Visitante visitante, Curso curso) {
		this(entity);
		this.membro = new MembroDTO(membro);
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





	public ChamadaAluno getChamadaAluno() {
		return chamadaAluno;
	}




	public void setChamadaAluno(ChamadaAluno chamadaAluno) {
		this.chamadaAluno = chamadaAluno;
	}




	public ChamadaMembro getChamadaMembro() {
		return chamadaMembro;
	}




	public void setChamadaMembro(ChamadaMembro chamadaMembro) {
		this.chamadaMembro = chamadaMembro;
	}




	public ChamadaVisitante getChamadaVisitante() {
		return chamadaVisitante;
	}




	public void setChamadaVisitante(ChamadaVisitante chamadaVisitante) {
		this.chamadaVisitante = chamadaVisitante;
	}




	public MembroDTO getMembro() {
		return membro;
	}


	public void setMembro(MembroDTO membro) {
		this.membro = membro;
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
		ListaPresencaEBDDTO other = (ListaPresencaEBDDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
	