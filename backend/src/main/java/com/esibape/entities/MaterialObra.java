package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_material_obra")
public class MaterialObra implements Serializable {

	private static final long serialVersionUID = 1L;
	
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String nome;
	    private boolean checkInConfirmado; 

	    
	    public MaterialObra() {
	    	
	    }


		public MaterialObra(Long id, String nome, boolean checkInConfirmado) {
			super();
			this.id = id;
			this.nome = nome;
			this.checkInConfirmado = checkInConfirmado;
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


		public boolean isCheckInConfirmado() {
			return checkInConfirmado;
		}


		public void setCheckInConfirmado(boolean checkInConfirmado) {
			this.checkInConfirmado = checkInConfirmado;
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
