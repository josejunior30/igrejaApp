package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.esibape.entities.OrdemServico;
import com.esibape.entities.Servico;
import com.esibape.entities.StatusOrdemDeServico;

public class OrdemServicoDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Long id;
    private String descricao;
    private List<ServicoDTO> servicos = new ArrayList<>();
    private StatusOrdemDeServico statusOrdem;
    
    public OrdemServicoDTO() {
    	
    }

    public OrdemServicoDTO(OrdemServico entity) {
	
    id = entity.getId();
	descricao = entity.getDescricao();
	statusOrdem = entity.getStatusOrdem();

}

    public OrdemServicoDTO(OrdemServico entity, List<Servico> servicos) {
        this(entity);
        servicos.forEach(servico -> this.servicos.add(new ServicoDTO(servico)));
    }
    public OrdemServicoDTO(OrdemServico entity, boolean includeMaterialObra) {
        this(entity);

        if (includeMaterialObra) {
            for (Servico servico : entity.getServicos()) {
                this.servicos.add(new ServicoDTO(servico, servico.getMaterialObra()));
            }
        } else {
            for (Servico servico : entity.getServicos()) {
                this.servicos.add(new ServicoDTO(servico));
            }
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

	public List<ServicoDTO> getServicos() {
		return servicos;
	}

	public void setServicos(List<ServicoDTO> servicos) {
		this.servicos = servicos;
	}

	public StatusOrdemDeServico getStatusOrdem() {
		return statusOrdem;
	}

	public void setStatusOrdem(StatusOrdemDeServico statusOrdem) {
		this.statusOrdem = statusOrdem;
	}

    
}

  