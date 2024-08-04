package com.esibape.entities;

import java.io.Serializable;
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
@Table(name="tb_pagamento")
public class Pagamento implements Serializable{
	private static final long serialVersionUID = 1L;

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private Integer valor;
private LocalDate dataPagamento;
private Integer totalMensalidade;
private Integer atrasado;
private Integer totalmes; 
private Integer total;
private Integer totalPix;
private Integer totalDinheiro;
@Enumerated(EnumType.STRING)
private FormaPagamento formaPagamento;
@Enumerated(EnumType.STRING)
private MesReferencia mesReferencia;

@ManyToOne()
@JoinColumn(name= "aluno_id")
private Alunos  alunosPG ;


public Pagamento() {
	
}



public Pagamento(Long id, Integer valor, LocalDate dataPagamento, Integer totalMensalidade, Integer atrasado,
		Integer totalmes, Integer total, Integer totalPix, Integer totalDinheiro, FormaPagamento formaPagamento,
		MesReferencia mesReferencia, Alunos alunosPG) {
	super();
	this.id = id;
	this.valor = valor;
	this.dataPagamento = dataPagamento;
	this.totalMensalidade = totalMensalidade;
	this.atrasado = atrasado;
	this.totalmes = totalmes;
	this.total = total;
	this.totalPix = totalPix;
	this.totalDinheiro = totalDinheiro;
	this.formaPagamento = formaPagamento;
	this.mesReferencia = mesReferencia;
	this.alunosPG = alunosPG;
}
















public Long getId() {
	return id;
}


public void setId(Long id) {
	this.id = id;
}


public Integer getValor() {
	return valor;
}


public void setValor(Integer valor) {
	this.valor = valor;
}


public LocalDate getDataPagamento() {
	return dataPagamento;
}


public void setDataPagamento(LocalDate dataPagamento) {
	this.dataPagamento = dataPagamento;
}




public Integer getTotal() {
	return total;
}


public void setTotal(Integer total) {
	this.total = total;
}


public Alunos getAlunosPG() {
	return alunosPG;
}




public void setAlunosPG(Alunos alunosPG) {
	this.alunosPG = alunosPG;
}




public Integer getTotalMensalidade() {
	return totalMensalidade;
}



public void setTotalMensalidade(Integer totalMensalidade) {
	this.totalMensalidade = totalMensalidade;
}




public Integer getAtrasado() {
	return atrasado;
}



public Integer getTotalPix() {
	return totalPix;
}



public void setTotalPix(Integer totalPix) {
	this.totalPix = totalPix;
}



public Integer getTotalDinheiro() {
	return totalDinheiro;
}



public void setTotalDinheiro(Integer totalDinheiro) {
	this.totalDinheiro = totalDinheiro;
}



public void setAtrasado(Integer atrasado) {
	this.atrasado = atrasado;
}








public Integer getTotalmes() {
	return totalmes;
}








public void setTotalmes(Integer totalmes) {
	this.totalmes = totalmes;
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
	Pagamento other = (Pagamento) obj;
	return Objects.equals(id, other.id);
}



}
