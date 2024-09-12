package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_quantidade_culto")
public class QuantidadePorCulto implements  Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer visitante;
	private Integer membro;
	private Integer total;
	private LocalDate data;
	private Integer numeroMulher;
	private Integer numeroHomem;
	TipoCulto TipoCulto;
	
	
	public QuantidadePorCulto(){
		
	}

	public QuantidadePorCulto(Long id, Integer visitante, Integer membro, Integer total, Integer numeroMulher, Integer numeroHomem,LocalDate data,
			TipoCulto tipoCulto) {
		super();
		this.id = id;
		this.visitante = visitante;
		this.membro = membro;
		this.total = total;
		this.data = data;
		TipoCulto = tipoCulto;
		
		this.numeroHomem = numeroHomem;
		this.numeroMulher =numeroMulher;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getVisitante() {
		return visitante;
	}

	public void setVisitante(Integer visitante) {
		this.visitante = visitante;
	}

	public Integer getMembro() {
		return membro;
	}

	public void setMembro(Integer membro) {
		this.membro = membro;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = this.visitante + this.membro;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public Integer getNumeroMulher() {
		return numeroMulher;
	}

	public void setNumeroMulher(Integer numeroMulher) {
		this.numeroMulher = numeroMulher;
	}

	public Integer getNumeroHomem() {
		return numeroHomem;
	}

	public void setNumeroHomem(Integer numeroHomem) {
		this.numeroHomem = numeroHomem;
	}

	public TipoCulto getTipoCulto() {
		return TipoCulto;
	}

	public void setTipoCulto(TipoCulto tipoCulto) {
		TipoCulto = tipoCulto;
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
		QuantidadePorCulto other = (QuantidadePorCulto) obj;
		return Objects.equals(id, other.id);
	}

	
	
}
