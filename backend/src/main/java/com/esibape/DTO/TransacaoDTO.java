package com.esibape.DTO;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.esibape.entities.DescricaoReceita;
import com.esibape.entities.TipoDespesa;
import com.esibape.entities.Transacao;



public class TransacaoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private BigDecimal valor;
	private LocalDate data;
	private String descricao;
	private Boolean isReceita;
    private DescricaoReceita descricaoReceita;
	private TipoDespesa tipoDespesa;
	  private ContaPagarDTO contaPagar; 
	
	public TransacaoDTO() {
		
	}
	
	public TransacaoDTO( Transacao entity ) {
		
		this.id = entity.getId();
		this.data= entity.getData();
		this.descricao = entity.getDescricao();
		this.isReceita =entity.getIsReceita();
		this.descricaoReceita=entity.getDescricaoReceita();
		this.tipoDespesa=entity.getTipoDespesa();
		this.valor =entity.getValor();
		 if (entity.getContaPagar() != null) {
	            this.contaPagar = new ContaPagarDTO(entity.getContaPagar());
	        }
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

	public DescricaoReceita getDescricaoReceita() {
		return descricaoReceita;
	}

	public void setDescricaoReceita(DescricaoReceita descricaoReceita) {
		this.descricaoReceita = descricaoReceita;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	
	public ContaPagarDTO getContaPagar() {
		return contaPagar;
	}

	public void setContaPagar(ContaPagarDTO contaPagar) {
		this.contaPagar = contaPagar;
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




}