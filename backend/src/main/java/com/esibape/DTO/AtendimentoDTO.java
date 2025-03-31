package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.esibape.entities.Atendimento;
import com.esibape.entities.Membro;
import com.esibape.entities.TipoAtendimento;
import com.esibape.entities.Visitante;


public class AtendimentoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@Enumerated(EnumType.STRING)
	private TipoAtendimento tipoAtendimento;
	private LocalTime horario;
	private LocalDate data; 
	private List<String> outro;

	  private Set<Long> membroIds =  new HashSet<>(); 
	private Set<Long> visitanteIds = new HashSet<>(); 
	 private Set<String> membroNomes;   
	    private Set<String> visitanteNomes;
	
	public AtendimentoDTO() {
		
		
	}
	
	public AtendimentoDTO(Atendimento atendimento) {
        this.id = atendimento.getId();
        this.horario = atendimento.getHorario();

        this.tipoAtendimento = atendimento.getTipoAtendimento();
        this.data = atendimento.getData();

        this.membroIds = atendimento.getMembro().stream()
                .map(Membro::getId)
                .collect(Collectors.toSet());

        this.visitanteIds = atendimento.getVisitante().stream()
                .map(Visitante::getId)
                .collect(Collectors.toSet());

        this.membroNomes = atendimento.getMembro().stream()
                .map(m -> m.getNome() + " " + m.getSobrenome()) // Nome + Sobrenome
                .collect(Collectors.toSet());

        this.visitanteNomes = atendimento.getVisitante().stream()
                .map(v -> v.getNome() + " " + v.getSobrenome()) // Nome + Sobrenome
                .collect(Collectors.toSet());
        
        this.outro = new ArrayList<>(atendimento.getOutro());
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


	public List<String> getOutro() {
		return outro;
	}

	public void setOutro(List<String> outro) {
		this.outro = outro;
	}

	public void setHorario(LocalTime horario) {
		this.horario = horario;
	}

	public LocalDate getData() {
		return data;
	}

	public Set<String> getMembroNomes() {
		return membroNomes;
	}

	public void setMembroNomes(Set<String> membroNomes) {
		this.membroNomes = membroNomes;
	}

	public Set<String> getVisitanteNomes() {
		return visitanteNomes;
	}

	public void setVisitanteNomes(Set<String> visitanteNomes) {
		this.visitanteNomes = visitanteNomes;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}



	public Set<Long> getMembroIds() {
		return membroIds;
	}

	public void setMembroIds(Set<Long> membroIds) {
		this.membroIds = membroIds;
	}

	public Set<Long> getVisitanteIds() {
		return visitanteIds;
	}

	public void setVisitanteIds(Set<Long> visitanteIds) {
		this.visitanteIds = visitanteIds;
	}




}