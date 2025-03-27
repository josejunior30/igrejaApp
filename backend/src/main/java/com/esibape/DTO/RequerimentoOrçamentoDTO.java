package com.esibape.DTO;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import com.esibape.entities.DescricaoConta;
import com.esibape.entities.Produto;
import com.esibape.entities.RequerimentoOrçamento;
import com.esibape.entities.StatusRequerimento;


public class RequerimentoOrçamentoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id; 
	private LocalDate dataRequerimento;
	private LocalDate dataEvento;
	private LocalDate dataAprovacao;
	private StatusRequerimento statusRequerimento;
	private LocalDate dataPagamento;
	 private DescricaoConta descricaoRequerimento;
	private String pergunta1;
	private String pergunta2;
	private String responsavel;
	private String emailResponsavel;
	private Integer quantidade;
	private String local; 
	private BigDecimal Total;
    private String createdByRequerimento;
    private ContaPagarDTO contaPagar;

	private List<ProdutoDTO> produto = new ArrayList<>();
	
	public RequerimentoOrçamentoDTO(){
		
	}

	public Long getId() {
		return id;
	}

	
	public RequerimentoOrçamentoDTO(RequerimentoOrçamento entity) {
	
		id = entity.getId();
		dataRequerimento = entity.getDataRequerimento();
		dataEvento = entity.getDataEvento();
		dataAprovacao = entity.getDataAprovacao();
		statusRequerimento = entity.getStatusRequerimento();
		dataPagamento = entity.getDataPagamento();
		pergunta1 = entity.getPergunta1();
		descricaoRequerimento=entity.getDescricaoRequerimento();
		pergunta2 = entity.getPergunta2();
		responsavel = entity.getResponsavel();
		quantidade = entity.getQuantidade();
		local = entity.getLocal();
		Total = entity.getTotal();
		createdByRequerimento=entity.getCreatedByRequerimento();
		emailResponsavel= entity.getEmailResponsavel();
		 if (entity.getContaPagar() != null) {
	            this.contaPagar = new ContaPagarDTO(entity.getContaPagar());
	        }
		
	}
	public RequerimentoOrçamentoDTO(RequerimentoOrçamento entity,List<Produto> produto ) {
		this(entity);
		produto.forEach(x-> this.produto.add(new ProdutoDTO(x)));
		
	}
	public void setId(Long id) {
		this.id = id;
	}

	

	public DescricaoConta getDescricaoRequerimento() {
		return descricaoRequerimento;
	}

	public void setDescricaoRequerimento(DescricaoConta descricaoRequerimento) {
		this.descricaoRequerimento = descricaoRequerimento;
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

	
	public String getCreatedByRequerimento() {
		return createdByRequerimento;
	}

	public void setCreatedByRequerimento(String createdByRequerimento) {
		this.createdByRequerimento = createdByRequerimento;
	}

	public StatusRequerimento getStatusRequerimento() {
		return statusRequerimento;
	}


	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public void setStatusRequerimento(StatusRequerimento statusRequerimento) {
		this.statusRequerimento = statusRequerimento;
	}


	public String getEmailResponsavel() {
		return emailResponsavel;
	}

	public void setEmailResponsavel(String emailResponsavel) {
		this.emailResponsavel = emailResponsavel;
	}

	public LocalDate getDataPagamento() {
		return dataPagamento;
	}

	
	
	public ContaPagarDTO getContaPagar() {
		return contaPagar;
	}

	public void setContaPagar(ContaPagarDTO contaPagar) {
		this.contaPagar = contaPagar;
	}

	public void setDataPagamento(LocalDate dataPagamento) {
		this.dataPagamento = dataPagamento;
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

	public BigDecimal getTotal() {
		return Total;
	}

	public void setTotal(BigDecimal total) {
		Total = total;
	}

	public List<ProdutoDTO> getProduto() {
		return produto;
	}

	public void setProduto(List<ProdutoDTO> produto) {
		this.produto = produto;
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
		RequerimentoOrçamentoDTO other = (RequerimentoOrçamentoDTO) obj;
		return Objects.equals(id, other.id);
	} 
	
}
