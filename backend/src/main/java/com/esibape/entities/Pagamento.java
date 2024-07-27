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
private Integer totalMes;
private Integer total;	
private FormaPagamento formaPagamento;

private MesReferencia mesReferencia;

@ManyToOne()
@JoinColumn(name= "aluno_id")
private Alunos  alunosPG ;


public Pagamento() {
	
}




public Pagamento(Long id, Integer valor, LocalDate dataPagamento, Integer totalMes, Integer total,
		FormaPagamento formaPagamento, MesReferencia mesReferencia, Alunos alunosPG) {
	super();
	this.id = id;
	this.valor = valor;
	this.dataPagamento = dataPagamento;
	this.totalMes = totalMes;
	this.total = total;
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


public Integer getTotalMes() {
	return totalMes;
}


public void setTotalMes(Integer totalMes) {
	this.totalMes = totalMes;
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
