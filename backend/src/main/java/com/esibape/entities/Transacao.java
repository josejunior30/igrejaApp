package com.esibape.entities;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name="tb_transacao")
public class Transacao implements Serializable{
	private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private BigDecimal valor;
	private LocalDate data;
	private String descricao;
    @ManyToOne
    @JoinColumn(name = "descricao_id", nullable = false)
    private DescricaoReceita descricaoReceita;
	private Boolean isReceita;
	 @Enumerated(EnumType.STRING)
	private TipoDespesa tipoDespesa;
	 @ManyToOne
	 @JoinColumn(name = "conta_pagar_id")
	 private ContaPagar contaPagar; 

	public Transacao() {
		
	}

	public Transacao(Long id, BigDecimal valor, LocalDate data, String descricao, DescricaoReceita descricaoReceita,
			Boolean isReceita, TipoDespesa tipoDespesa, ContaPagar contaPagar) {
		super();
		this.id = id;
		this.valor = valor;
		this.data = data;
		this.descricao = descricao;
		this.descricaoReceita = descricaoReceita;
		this.isReceita = isReceita;
		this.tipoDespesa = tipoDespesa;
		this.contaPagar = contaPagar;
	}





	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public ContaPagar getContaPagar() {
		return contaPagar;
	}



	public void setContaPagar(ContaPagar contaPagar) {
		this.contaPagar = contaPagar;
	}



	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	
	public Boolean getIsReceita() {
		return isReceita;
	}

	public void setIsReceita(Boolean isReceita) {
		this.isReceita = isReceita;
	}

	public TipoDespesa getTipoDespesa() {
		return tipoDespesa;
	}

	public void setTipoDespesa(TipoDespesa tipoDespesa) {
		this.tipoDespesa = tipoDespesa;
	}


	public DescricaoReceita getDescricaoReceita() {
		return descricaoReceita;
	}

	public void setDescricaoReceita(DescricaoReceita descricaoReceita) {
		this.descricaoReceita = descricaoReceita;
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
		Transacao other = (Transacao) obj;
		return Objects.equals(id, other.id);
	}
	
}