package com.esibape.DTO;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import com.esibape.entities.FluxoCaixa;




public class FluxoCaixaDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private BigDecimal receitaTotal;
	private BigDecimal despesaTotal;
	private BigDecimal saldoLiquido;
	private BigDecimal despesaFixa;
	private BigDecimal despesaVariavel;
	private Integer mes;
	private Integer ano;
	
	
	public FluxoCaixaDTO() {
		
	}
	
	public FluxoCaixaDTO( FluxoCaixa entity ) {
		
		this.id = entity.getId();
		this.despesaTotal= entity.getDespesaTotal();
		this.receitaTotal = entity.getReceitaTotal();
		this.saldoLiquido =entity.getSaldoLiquido();
		this.ano=entity.getAno();
		this.mes=entity.getMes();
		this.despesaFixa=entity.getDespesaFixa();
		this.despesaVariavel=entity.getDespesaVariavel();
		
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public BigDecimal getReceitaTotal() {
		return receitaTotal;
	}

	public BigDecimal getDespesaFixa() {
		return despesaFixa;
	}

	public void setDespesaFixa(BigDecimal despesaFixa) {
		this.despesaFixa = despesaFixa;
	}

	public BigDecimal getDespesaVariavel() {
		return despesaVariavel;
	}

	public void setDespesaVariavel(BigDecimal despesaVariavel) {
		this.despesaVariavel = despesaVariavel;
	}

	public void setReceitaTotal(BigDecimal receitaTotal) {
		this.receitaTotal = receitaTotal;
	}

	public BigDecimal getDespesaTotal() {
		return despesaTotal;
	}

	public void setDespesaTotal(BigDecimal despesaTotal) {
		this.despesaTotal = despesaTotal;
	}

	public BigDecimal getSaldoLiquido() {
		return saldoLiquido;
	}

	public Integer getMes() {
		return mes;
	}

	public void setMes(Integer mes) {
		this.mes = mes;
	}

	public Integer getAno() {
		return ano;
	}

	public void setAno(Integer ano) {
		this.ano = ano;
	}

	public void setSaldoLiquido(BigDecimal saldoLiquido) {
		this.saldoLiquido = saldoLiquido;
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
		FluxoCaixaDTO other = (FluxoCaixaDTO) obj;
		return Objects.equals(id, other.id);
	}

}