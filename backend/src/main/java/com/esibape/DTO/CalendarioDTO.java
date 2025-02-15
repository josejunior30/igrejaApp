package com.esibape.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import com.esibape.entities.Calendario;



public class CalendarioDTO {

	private Long id;
	private String titulo;
	private String descricao;
	private String responsavel;
	private LocalDate data;
	private LocalTime hora;
    

   
    public CalendarioDTO() {
    }


 
    public CalendarioDTO(Calendario entity) {
        this.id = entity.getId();
        this.titulo = entity.getTitulo();
        this.descricao = entity.getDescricao();
        this.responsavel = entity.getResponsavel();
        this.data = entity.getData();
        this.hora = entity.getHora();
        
       
    }

   

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getTitulo() {
		return titulo;
	}



	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}



	public String getDescricao() {
		return descricao;
	}



	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}



	public String getResponsavel() {
		return responsavel;
	}



	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}



	public LocalDate getData() {
		return data;
	}



	public void setData(LocalDate data) {
		this.data = data;
	}



	public LocalTime getHora() {
		return hora;
	}



	public void setHora(LocalTime hora) {
		this.hora = hora;
	}



	@Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        CalendarioDTO other = (CalendarioDTO) obj;
        return Objects.equals(id, other.id);
    }
}
