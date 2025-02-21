package com.esibape.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_orcamento_mensal")
public class OrcamentoMensal implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private BigDecimal despesaPrevista;
	private BigDecimal receitaPrevista;
    private Integer mes;
    private Integer ano;
    
    public OrcamentoMensal() {
    	
    }

	public OrcamentoMensal(Long id, BigDecimal despesaPrevista, BigDecimal receitaPrevista, Integer mes, Integer ano) {
		super();
		this.id = id;
		this.despesaPrevista = despesaPrevista;
		this.receitaPrevista = receitaPrevista;
		this.mes = mes;
		this.ano = ano;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getDespesaPrevista() {
		return despesaPrevista;
	}

	public void setDespesaPrevista(BigDecimal despesaPrevista) {
		this.despesaPrevista = despesaPrevista;
	}

	public BigDecimal getReceitaPrevista() {
		return receitaPrevista;
	}

	public void setReceitaPrevista(BigDecimal receitaPrevista) {
		this.receitaPrevista = receitaPrevista;
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
		OrcamentoMensal other = (OrcamentoMensal) obj;
		return Objects.equals(id, other.id);
	}
    
    

}
