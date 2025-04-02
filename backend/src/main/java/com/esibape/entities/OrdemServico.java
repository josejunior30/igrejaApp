package com.esibape.entities;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name="tb_ordem_servico")
public class OrdemServico implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @OneToMany
    private List<Servico> servicos;

    @Enumerated(EnumType.STRING)
    private StatusOrdemDeServico statusOrdem;
    
    public OrdemServico() {
    	
    }

	
	public OrdemServico(Long id, String descricao, List<Servico> servicos, StatusOrdemDeServico statusOrdem) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.servicos = servicos;
		this.statusOrdem = statusOrdem;
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


	public List<Servico> getServicos() {
		return servicos;
	}


	public void setServicos(List<Servico> servicos) {
		this.servicos = servicos;
	}


	public StatusOrdemDeServico getStatusOrdem() {
		return statusOrdem;
	}


	public void setStatusOrdem(StatusOrdemDeServico statusOrdem) {
		this.statusOrdem = statusOrdem;
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
		OrdemServico other = (OrdemServico) obj;
		return Objects.equals(id, other.id);
	}
    
    

}
