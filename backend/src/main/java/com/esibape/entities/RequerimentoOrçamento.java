package com.esibape.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "tb_requerimento")
public class RequerimentoOrçamento implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dataRequerimento;
    private LocalDate dataEvento;
    private LocalDate dataAprovacao;
    @Enumerated(EnumType.STRING)
    private StatusRequerimento statusRequerimento;
    private LocalDate dataPagamento;
    private String pergunta1;
    private String pergunta2;
    private String responsavel;
    private String emailResponsavel;
    private String local;
    private Integer quantidade;
    @Column(nullable = false)
    private BigDecimal total = BigDecimal.ZERO;

    @OneToMany(mappedBy = "requerimento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produto = new ArrayList<>();

    public RequerimentoOrçamento() {}



	public RequerimentoOrçamento(Long id, LocalDate dataRequerimento, LocalDate dataEvento, LocalDate dataAprovacao,
			StatusRequerimento statusRequerimento, LocalDate dataPagamento, String pergunta1, String pergunta2,
			String responsavel, String emailResponsavel, String local, Integer quantidade,
			List<Produto> produto) {
		super();
		this.id = id;
		this.dataRequerimento = dataRequerimento;
		this.dataEvento = dataEvento;
		this.dataAprovacao = dataAprovacao;
		this.statusRequerimento = statusRequerimento;
		this.dataPagamento = dataPagamento;
		this.pergunta1 = pergunta1;
		this.pergunta2 = pergunta2;
		this.responsavel = responsavel;
		this.emailResponsavel = emailResponsavel;
		this.local = local;
		this.quantidade = quantidade;
		this.produto = produto;
		calcularTotal();
	}

	public void setProduto(List<Produto> produto) {
	    this.produto = produto;
	    calcularTotal(); // Atualiza o total automaticamente
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataPagamento() {
        return dataPagamento;
    }

    public StatusRequerimento getStatusRequerimento() {
        return statusRequerimento;
    }


    public void setStatusRequerimento(StatusRequerimento statusRequerimento) {
        this.statusRequerimento = statusRequerimento;
    }

    public LocalDate getDataRequerimento() {
        return dataRequerimento;
    }

 
	public void setDataRequerimento(LocalDate dataRequerimento) {
        this.dataRequerimento = dataRequerimento;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate dataEvento) {
        this.dataEvento = dataEvento;
    }

    public LocalDate getDataAprovacao() {
        return dataAprovacao;
    }
    

    public Integer getQuantidade() {
		return quantidade;
	}



	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}



	public void setDataAprovacao(LocalDate dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public List<Produto> getProduto() {
        return produto;
    }
    
    public String getEmailResponsavel() {
		return emailResponsavel;
	}

	public void setEmailResponsavel(String emailResponsavel) {
		this.emailResponsavel = emailResponsavel;
	}

	public String getPergunta1() {
		return pergunta1;
	}

	public void setPergunta1(String pergunta1) {
		this.pergunta1 = pergunta1;
	}

	public String getPergunta2() {
		return pergunta2;
	}

	public void setPergunta2(String pergunta2) {
		this.pergunta2 = pergunta2;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public void setDataPagamento(LocalDate dataPagamento) {
		this.dataPagamento = dataPagamento;
	}




    public void setTotal(BigDecimal total) {
		this.total = total;
	}



	public BigDecimal getTotal() {
        return total;
    }
	public void calcularTotal() {
	    this.total = produto.stream()
	            .map(p -> p.getPreço().multiply(BigDecimal.valueOf(p.getQuantidade()))) // Multiplica preço pela quantidade
	            .reduce(BigDecimal.ZERO, BigDecimal::add); // Soma todos os valores
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
        RequerimentoOrçamento other = (RequerimentoOrçamento) obj;
        return Objects.equals(id, other.id);
    }
}
