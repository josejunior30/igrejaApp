package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import com.esibape.entities.Alunos;
import com.esibape.entities.FormaPagamento;
import com.esibape.entities.MesReferencia;
import com.esibape.entities.Pagamento;


public class PagamentoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Integer valor;
    private LocalDate dataPagamento;
    private Integer totalMensalidade;
    private Integer atrasado;
    private Integer totalMes; 
    private Integer total;
    private Integer totalCartao; 
    private Integer totalPix;
    private Integer totalDinheiro;
    private FormaPagamento formaPagamento;
    private MesReferencia mesReferencia;
    private AlunosDTO alunosPG;
 
  
    
    public PagamentoDTO() {
    
    }

    

	public PagamentoDTO(Long id, Integer valor, LocalDate dataPagamento, Integer totalMensalidade, Integer atrasado,
			Integer totalMes, Integer total, FormaPagamento formaPagamento, Integer totalCartao ,MesReferencia mesReferencia,
			AlunosDTO alunosPG, Integer totalPix, Integer totalDinheiro) {
		super();
		this.id = id;
		this.valor = valor;
		this.dataPagamento = dataPagamento;
		this.totalMensalidade = totalMensalidade;
		this.atrasado = atrasado;
		this.totalMes = totalMes;
		this.total = total;
		this.formaPagamento = formaPagamento;
		this.mesReferencia = mesReferencia;
		this.alunosPG = alunosPG;
		this.totalPix = totalPix;
		this.totalCartao =totalCartao;
		this.totalDinheiro = totalDinheiro;
	
	}





	public PagamentoDTO(Pagamento entity) {
        this.id = entity.getId();
        this.valor = entity.getValor();
        this.dataPagamento = entity.getDataPagamento();
        this.totalMes = entity.getTotalMes();
        this.total = entity.getTotal();
        this.formaPagamento = entity.getFormaPagamento();
        this.mesReferencia = entity.getMesReferencia();
        this.atrasado = entity.getAtrasado();
        this.totalMensalidade = entity.getTotalMensalidade();
        this.totalPix = entity.getTotalPix();
        this.totalCartao =entity.getTotalCartao();
        this.totalDinheiro = entity.getTotalDinheiro();
        
       
       
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



	public Integer getTotalCartao() {
		return totalCartao;
	}



	public void setTotalCartao(Integer totalCartao) {
		this.totalCartao = totalCartao;
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
