package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


import com.esibape.entities.QuantidadePorCulto;
import com.esibape.entities.TipoCulto;

public class QuantidadePorCultoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Integer visitante;
	private Integer membro;
	private Integer total;
	private LocalDate data;
	private String resumo;;
	TipoCulto TipoCulto;

	
	public QuantidadePorCultoDTO(){
		
	}

	public QuantidadePorCultoDTO(Long id, Integer visitante, Integer membro, Integer numeroHomem,Integer numeroMulher,Integer total, LocalDate data,
		TipoCulto tipoCulto) {
		super();
		this.id = id;
		this.visitante = visitante;
		this.membro = membro;
		this.total = total;
		this.data = data;
		this.TipoCulto = tipoCulto;
		

	}

	public QuantidadePorCultoDTO(QuantidadePorCulto entity) {
		id = entity.getId();
		visitante = entity.getVisitante();
		membro = entity.getMembro();
		total = entity.getTotal();
		data = entity.getData();
		TipoCulto = entity.getTipoCulto();
	resumo=entity.getResumo();
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


	public String getResumo() {
		return resumo;
	}

	public void setResumo(String resumo) {
		this.resumo = resumo;
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
		QuantidadePorCultoDTO other = (QuantidadePorCultoDTO) obj;
		return Objects.equals(id, other.id);
	}

	
}
