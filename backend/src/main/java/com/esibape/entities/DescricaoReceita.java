package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name="tb_descricao_receita")
public class DescricaoReceita implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    @Column(nullable = false, unique = true, length = 100)  
    private String descricao;

	public DescricaoReceita() {
		
		
	}

	public DescricaoReceita(Long id, String descricao) {
		super();
		this.id = id;
		this.descricao = descricao;
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
		DescricaoReceita other = (DescricaoReceita) obj;
		return Objects.equals(id, other.id);
	}
	

}