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
@Table(name="tb_lista_presenca_Ebd")
public class ListaPresencaEBD implements Serializable{
	private static final long serialVersionUID = 1L;
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate data; 
	 @Enumerated(EnumType.STRING)
    private ChamadaMembro chamadaMembro; 

	@ManyToOne
    @JoinColumn(name = "membro_id", nullable = false)
	private Membro membro ;
	
	@ManyToOne
	@JoinColumn(name= "curso_id")
	private Curso curso; 
	
	public ListaPresencaEBD(){
		
	}



	public ListaPresencaEBD(Long id, LocalDate data, ChamadaMembro chamadaMembro,
			Membro membro, Curso curso) {
		super();
		this.id = id;
		this.data = data;
		this.chamadaMembro = chamadaMembro;
		this.membro = membro;
		this.curso = curso;
	}



	public ChamadaMembro getChamadaMembro() {
		return chamadaMembro;
	}

	public void setChamadaMembro(ChamadaMembro chamadaMembro) {
		this.chamadaMembro = chamadaMembro;
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





	public Membro getMembro() {
		return membro;
	}


	public void setMembro(Membro membro) {
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
		ListaPresencaEBD other = (ListaPresencaEBD) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
	