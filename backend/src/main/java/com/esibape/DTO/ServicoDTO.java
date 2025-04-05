package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import com.esibape.entities.MaterialObra;
import com.esibape.entities.OrdemServico;
import com.esibape.entities.Servico;
import com.esibape.entities.StatusServico;

public class ServicoDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
    private Long id;
    private String descricao;
    private StatusServico statusServico;
    private List<MaterialObraDTO> materialObra =  new ArrayList<>();
    
    public ServicoDTO() {
    	
    	
    }
	

	public ServicoDTO(Servico entity) {
	    this.id = entity.getId();
	    this.descricao = entity.getDescricao();

	    this.statusServico = entity.getStatusServico();
	  
	    if (entity.getMaterialObra() != null) {
	        entity.getMaterialObra().forEach(material ->
	            this.materialObra.add(new MaterialObraDTO(material))
	        );
	    }
	}

	
	
	public ServicoDTO(Servico entity, List<MaterialObra> materialObra) {
	    this(entity);
	    materialObra.forEach(x -> this.materialObra.add(new MaterialObraDTO(x)));
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


	public StatusServico getStatusServico() {
		return statusServico;
	}


	public void setStatusServico(StatusServico statusServico) {
		this.statusServico = statusServico;
	}


	public List<MaterialObraDTO> getMaterialObra() {
		return materialObra;
	}


	public void setMaterialObra(List<MaterialObraDTO> materialObra) {
		this.materialObra = materialObra;
	}
	

}