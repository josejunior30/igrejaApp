package com.esibape.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.context.SecurityContextHolder;

public class ContaPagar implements Serializable{

	private static final long serialVersionUID = 1L;

	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String descricao;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private LocalDate dataVencimento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPagamento status;

    @Column(nullable = false)
    private String fornecedor;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime dataCriacao;

    @Column(nullable = false, updatable = false)
    private String createdBy;

    public ContaPagar() {
    	
    }
    
    
    public ContaPagar(Long id, String descricao, BigDecimal valor, LocalDate dataVencimento, StatusPagamento status,
			String fornecedor, LocalDateTime dataCriacao, String createdBy) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.valor = valor;
		this.dataVencimento = dataVencimento;
		this.status = status;
		this.fornecedor = fornecedor;
		this.dataCriacao = dataCriacao;
		this.createdBy = createdBy;
	}


	@PrePersist
    public void setCreatedByUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            this.createdBy = auth.getName();
        } else {
            this.createdBy = "Sistema"; // Caso não tenha usuário autenticado
        }
    }


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public BigDecimal getValor() {
		return valor;
	}


	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}


	public LocalDate getDataVencimento() {
		return dataVencimento;
	}


	public void setDataVencimento(LocalDate dataVencimento) {
		this.dataVencimento = dataVencimento;
	}


	public StatusPagamento getStatus() {
		return status;
	}


	public void setStatus(StatusPagamento status) {
		this.status = status;
	}


	public String getFornecedor() {
		return fornecedor;
	}


	public void setFornecedor(String fornecedor) {
		this.fornecedor = fornecedor;
	}


	public LocalDateTime getDataCriacao() {
		return dataCriacao;
	}


	public void setDataCriacao(LocalDateTime dataCriacao) {
		this.dataCriacao = dataCriacao;
	}


	public String getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
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
		ContaPagar other = (ContaPagar) obj;
		return Objects.equals(id, other.id);
	}


	
    
}

