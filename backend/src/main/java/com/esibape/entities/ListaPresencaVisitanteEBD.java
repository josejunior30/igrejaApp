package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table(name="tb_lista_presenca_Visitante_Ebd")
public class ListaPresencaVisitanteEBD implements Serializable{
	private static final long serialVersionUID = 1L;
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate data; 
	 @Enumerated(EnumType.STRING)
    private ChamadaVisitante chamadaVisitante; 

	@ManyToOne
	@JoinColumn(name= "visitante_id")
	private Visitante visitante;
	
	@ManyToOne
	@JoinColumn(name= "curso_id")

	private Curso curso; 
	
	public ListaPresencaVisitanteEBD(){
		
	}



	public ListaPresencaVisitanteEBD(Long id, LocalDate data, ChamadaVisitante chamadaVisitante,
		 Visitante visitante, Curso curso) {
		super();
		this.id = id;
		this.data = data;
		this.chamadaVisitante = chamadaVisitante;
		this.visitante = visitante;
		this.curso = curso;
	}





	public ChamadaVisitante getChamadaVisitante() {
		return chamadaVisitante;
	}



	public void setChamadaVisitante(ChamadaVisitante chamadaVisitante) {
		this.chamadaVisitante = chamadaVisitante;
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


	public Curso getCurso() {
		return curso;
	}




	public void setCurso(Curso curso) {
		this.curso = curso;
	}



	public Visitante getVisitante() {
		return visitante;
	}


	public void setVisitante(Visitante visitante) {
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
		ListaPresencaVisitanteEBD other = (ListaPresencaVisitanteEBD) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
	