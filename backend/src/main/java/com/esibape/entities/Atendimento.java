package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;



@Entity
@Table(name="tb_atendimento")
public class Atendimento implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Enumerated(EnumType.STRING)
	private TipoAtendimento tipoAtendimento;
	@JsonFormat(pattern = "HH:mm")
	private LocalTime horario;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate data; 
	
	@ManyToMany(mappedBy = "atendimentoMembro", fetch = FetchType.EAGER)
    private  Set<Membro> membro = new HashSet<>(); 
	
	@ManyToMany(mappedBy = "atendimentoVisitante", fetch = FetchType.EAGER)
	private Set<Visitante> visitante = new HashSet<>(); 
	
	
	public Atendimento() {
		
		
	}


	public Atendimento(Long id, TipoAtendimento tipoAtendimento, LocalTime horario, LocalDate data, Set<Membro> membro,
			Set<Visitante> visitante) {
		super();
		this.id = id;
		this.tipoAtendimento = tipoAtendimento;
		this.horario = horario;
		this.data = data;
		this.membro = membro;
		this.visitante = visitante;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public TipoAtendimento getTipoAtendimento() {
		return tipoAtendimento;
	}


	public void setTipoAtendimento(TipoAtendimento tipoAtendimento) {
		this.tipoAtendimento = tipoAtendimento;
	}


	public LocalTime getHorario() {
		return horario;
	}


	public void setHorario(LocalTime horario) {
		this.horario = horario;
	}


	public LocalDate getData() {
		return data;
	}


	public void setData(LocalDate data) {
		this.data = data;
	}


	public Set<Membro> getMembro() {
		return membro;
	}


	public void setMembro(Set<Membro> membro) {
		this.membro = membro;
	}


	public Set<Visitante> getVisitante() {
		return visitante;
	}


	public void setVisitante(Set<Visitante> visitante) {
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
		Atendimento other = (Atendimento) obj;
		return Objects.equals(id, other.id);
	}
	

}