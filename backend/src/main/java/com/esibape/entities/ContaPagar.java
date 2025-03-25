package com.esibape.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
@Entity
@Table(name="tb_conta_pagar")
public class ContaPagar implements Serializable{

	private static final long serialVersionUID = 1L;


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String descricao;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private LocalDate dataVencimento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPagamento status;


    @ManyToOne
    @JoinColumn(name = "descricao_id", nullable = false)
    private DescricaoConta descricaoConta;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(updatable = false, nullable = false)
    private LocalDateTime dataCriacao;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataPagamento;

    private String createdByConta;
    @Enumerated(EnumType.STRING)
    private TipoDespesa tipoDespesa;
    private String createdBy;
    @OneToMany(mappedBy = "contaPagar", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transacao> transacao = new ArrayList<>();
    
    @OneToMany(mappedBy = "contaPagar", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RequerimentoOrçamento>requerimentoOrçamento = new ArrayList<>();
    
    public ContaPagar() {
    	
    }
    




	public ContaPagar(Long id, String descricao, BigDecimal valor, LocalDate dataVencimento, StatusPagamento status,
			DescricaoConta descricaoConta, LocalDateTime dataCriacao, LocalDateTime dataPagamento,
			String createdByConta, TipoDespesa tipoDespesa, String createdBy, List<Transacao> transacao,
			List<RequerimentoOrçamento> requerimentoOrçamento) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.valor = valor;
		this.dataVencimento = dataVencimento;
		this.status = status;
		this.descricaoConta = descricaoConta;
		this.dataCriacao = dataCriacao;
		this.dataPagamento = dataPagamento;
		this.createdByConta = createdByConta;
		this.tipoDespesa = tipoDespesa;
		this.createdBy = createdBy;
		this.transacao = transacao;
		this.requerimentoOrçamento = requerimentoOrçamento;
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


	public List<Transacao> getTransacao() {
		return transacao;
	}




	public void setTransacao(List<Transacao> transacao) {
		this.transacao = transacao;
	}




	public DescricaoConta getDescricaoConta() {
		return descricaoConta;
	}





	public void setDescricaoConta(DescricaoConta descricaoConta) {
		this.descricaoConta = descricaoConta;
	}





	public TipoDespesa getTipoDespesa() {
		return tipoDespesa;
	}


	public void setTipoDespesa(TipoDespesa tipoDespesa) {
		this.tipoDespesa = tipoDespesa;
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


	public String getCreatedByConta() {
		return createdByConta;
	}



	public void setCreatedByConta(String createdByConta) {
		this.createdByConta = createdByConta;
	}



	public LocalDateTime getDataPagamento() {
		return dataPagamento;
	}


	public void setDataPagamento(LocalDateTime dataPagamento) {
		this.dataPagamento = dataPagamento;
	}


	public StatusPagamento getStatus() {
		return status;
	}


	public List<RequerimentoOrçamento> getRequerimentoOrçamento() {
		return requerimentoOrçamento;
	}






	public void setRequerimentoOrçamento(List<RequerimentoOrçamento> requerimentoOrçamento) {
		this.requerimentoOrçamento = requerimentoOrçamento;
	}






	public void setStatus(StatusPagamento status) {
	    this.status = status;
	    if (status == StatusPagamento.PAGO) {
	        this.dataPagamento = LocalDateTime.now(); // Atualiza a data de pagamento automaticamente
	    } else {
	        this.dataPagamento = null; 
	    }
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
	  public boolean isFixa() {
	        return this.tipoDespesa == TipoDespesa.FIXO;
	    }

}