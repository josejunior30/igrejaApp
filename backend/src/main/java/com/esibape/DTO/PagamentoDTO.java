package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.esibape.entities.Alunos;
import com.esibape.entities.FormaPagamento;
import com.esibape.entities.MesReferencia;
import com.esibape.entities.Pagamento;


public class PagamentoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Integer valor;
    private LocalDate dataPagamento;
    private Integer totalMes;
    private Integer total;
    private FormaPagamento formaPagamento;
    private MesReferencia mesReferencia;
    private AlunosDTO alunosPG;

    public PagamentoDTO() {
    }

    public PagamentoDTO(Long id, Integer valor, LocalDate dataPagamento, Integer totalMes, Integer total,
                        FormaPagamento formaPagamento, MesReferencia mesReferencia, AlunosDTO alunosPG) {
        this.id = id;
        this.valor = valor;
        this.dataPagamento = dataPagamento;
        this.totalMes = totalMes;
        this.total = total;
        this.formaPagamento = formaPagamento;
        this.mesReferencia = mesReferencia;
        this.alunosPG = alunosPG;
    }

    public PagamentoDTO(Pagamento entity) {
        this.id = entity.getId();
        this.valor = entity.getValor();
        this.dataPagamento = entity.getDataPagamento();
        this.totalMes = entity.getTotalMes();
        this.total = entity.getTotal();
        this.formaPagamento = entity.getFormaPagamento();
        this.mesReferencia = entity.getMesReferencia();
       
    }

    public PagamentoDTO(Pagamento entity, Alunos alunosPG) {
        this(entity);
        this.alunosPG = new AlunosDTO(entity.getAlunosPG());
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

	public AlunosDTO getAlunosPG() {
		return alunosPG;
	}

	public void setAlunosPG(AlunosDTO alunosPG) {
		this.alunosPG = alunosPG;
	}

}
