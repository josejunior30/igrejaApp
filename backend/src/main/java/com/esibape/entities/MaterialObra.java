package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="tb_material_obra")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class MaterialObra implements Serializable {

	private static final long serialVersionUID = 1L;
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String nome;
	    private Boolean checkInConfirmado; 

	    @ManyToOne
	    @JoinColumn(name = "servico_id")
	
	    private Servico servico;
	    public MaterialObra() {
	    	
	    }
		public MaterialObra(Long id, String nome, Boolean checkInConfirmado, Servico servico) {
			super();
			this.id = id;
			this.nome = nome;
			this.checkInConfirmado = checkInConfirmado;
			this.servico = servico;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getNome() {
			return nome;
		}
		public void setNome(String nome) {
			this.nome = nome;
		}
		public Boolean getCheckInConfirmado() {
			return checkInConfirmado;
		}
		public void setCheckInConfirmado(Boolean checkInConfirmado) {
			this.checkInConfirmado = checkInConfirmado;
		}
		public Servico getServico() {
			return servico;
		}
		public void setServico(Servico servico) {
			this.servico = servico;
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
			MaterialObra other = (MaterialObra) obj;
			return Objects.equals(id, other.id);
		}
	    
}