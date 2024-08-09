package com.esibape.DTO;

import java.io.Serializable;

import com.esibape.entities.OutrosPG;
import com.esibape.entities.FormaPagamento;
import com.esibape.entities.MesReferencia;


public class OutrosPGDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String entrada;
	private Integer valor;
	private FormaPagamento formaPagamento;
	private MesReferencia mesReferencia;
	
	public OutrosPGDTO() {
		
	}


	public OutrosPGDTO(Long id, String entrada, Integer valor, FormaPagamento formaPagamento,MesReferencia mesReferencia,PagamentoDTO pagamentoEntrada ) {
		super();
		this.id = id;
		this.entrada = entrada;
		this.valor = valor;
		this.formaPagamento = formaPagamento;
		this.mesReferencia= mesReferencia;
	}
	
	public OutrosPGDTO(OutrosPG entity) {
		this.id = entity.getId();
		this.entrada = entity.getEntrada();
		this.valor = entity.getValor();
		this.formaPagamento= entity.getFormaPagamento();
		this.mesReferencia= entity.getMesReferencia();
		
	}
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getEntrada() {
		return entrada;
	}


	public void setEntrada(String entrada) {
		this.entrada = entrada;
	}


	public Integer getValor() {
		return valor;
	}


	public void setValor(Integer valor) {
		this.valor = valor;
	}


	public FormaPagamento getFormaPagamento() {
		return formaPagamento;
	}


	public void setFormaPagamento(FormaPagamento formaPagamento) {
		this.formaPagamento = formaPagamento;
	}


	public MesReferencia getMesReferencia() {
		return mesReferencia;
	}


	public void setMesReferencia(MesReferencia mesReferencia) {
		this.mesReferencia = mesReferencia;
	}




	


	

}
