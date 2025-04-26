package com.esibape.DTO;

import java.io.Serializable;
import java.util.Objects;

<<<<<<< HEAD
import com.esibape.entities.OpcaoAtendimento;

public class OpcaoAtendimentoDTO implements Serializable{
=======
import com.esibape.entities.DescricaoReceita;
import com.esibape.entities.OpcaoAtendimento;


	public class OpcaoAtendimentoDTO implements Serializable{
>>>>>>> 1bbf3b950d3f4862793f9cbc6fa34d1336e3f09c
	private static final long serialVersionUID = 1L;
	private Long id;
	private String descricao;
	  
	public OpcaoAtendimentoDTO() {
			
			
	}

	public OpcaoAtendimentoDTO(OpcaoAtendimento entity) {
		
		this.id=entity.getId();
		descricao= entity.getDescricao();
		

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
		OpcaoAtendimentoDTO other = (OpcaoAtendimentoDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
<<<<<<< HEAD
}

=======
}
>>>>>>> 1bbf3b950d3f4862793f9cbc6fa34d1336e3f09c
