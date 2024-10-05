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
    private StatusRequerimento statusRequerimento;
    private LocalDate dataPagamento;
    private String pergunta1;
    private String pergunta2;
    private String responsavel;
    private String local;

    @Column(nullable = false)
    private BigDecimal total = BigDecimal.ZERO;

    @OneToMany(mappedBy = "requerimento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produto = new ArrayList<>();

    public RequerimentoOrçamento() {}

    public RequerimentoOrçamento(Long id, LocalDate dataRequerimento, LocalDate dataEvento, LocalDate dataAprovacao,
                                  StatusRequerimento statusRequerimento, LocalDate dataPagamento, BigDecimal total, 
                                  String pergunta1, String pergunta2, String responsavel, String local, List<Produto> produto) {
        this.id = id;
        this.dataRequerimento = dataRequerimento;
        this.dataEvento = dataEvento;
        this.dataAprovacao = dataAprovacao;
        this.statusRequerimento = statusRequerimento;
        this.dataPagamento = dataPagamento;
        this.pergunta1 = pergunta1;
        this.pergunta2 = pergunta2;
        this.responsavel = responsavel;
        this.local = local;
        this.produto = produto;
        this.total = total;
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

    public BigDecimal getTotal() {
        return total;
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

    public void setDataAprovacao(LocalDate dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public List<Produto> getProduto() {
        return produto;
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

	public void setProduto(List<Produto> produto) {
        this.produto = produto;
        recalculateTotal();  // Recalcula o total sempre que os produtos são alterados
    }

    public void addProduto(Produto produto) {
        produto.setRequerimento(this);
        this.produto.add(produto);
        recalculateTotal();  // Recalcula o total ao adicionar um produto
    }

    public void removeProduto(Produto produto) {
        this.produto.remove(produto);
        recalculateTotal();  // Recalcula o total ao remover um produto
    }

    @SuppressWarnings("deprecation")
	private void recalculateTotal() {
        this.total = produto.stream()
                            .map(Produto::getPreço)                     // Mapeia os preços dos produtos
                            .reduce(BigDecimal.ZERO, BigDecimal::add)   // Soma todos os preços
                            .setScale(2, BigDecimal.ROUND_HALF_UP);     // Arredonda para 2 casas decimais
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
