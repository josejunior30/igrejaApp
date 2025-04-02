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
@Table(name="tb_servico")
public class Servico implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private StatusServico statusServico;

    @OneToMany
    private List<MaterialObra> MaterialObra;
    
    public Servico() {
    	
    	
    }

	public Servico(Long id, String descricao, StatusServico statusServico,
			List<com.esibape.entities.MaterialObra> materialObra) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.statusServico = statusServico;
		MaterialObra = materialObra;
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

	public List<MaterialObra> getMaterialObra() {
		return MaterialObra;
	}

	public void setMaterialObra(List<MaterialObra> materialObra) {
		MaterialObra = materialObra;
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
		Servico other = (Servico) obj;
		return Objects.equals(id, other.id);
	}
    
}