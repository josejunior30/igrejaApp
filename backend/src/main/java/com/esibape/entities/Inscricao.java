package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tb_inscricao")
public class Inscricao implements Serializable{

	private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;
    
    @ManyToOne
    @JoinColumn(name = "membro_id")
    private Membro membroEBD;
    
    public Inscricao () {
    	
    	
    }

	public Inscricao(Long id, Curso curso, Membro membroEBD) {
		super();
		this.id = id;
		this.curso = curso;
		this.membroEBD = membroEBD;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public Membro getMembroEBD() {
		return membroEBD;
	}

	public void setMembroEBD(Membro membroEBD) {
		this.membroEBD = membroEBD;
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
		Inscricao other = (Inscricao) obj;
		return Objects.equals(id, other.id);
	}
    
	
}
