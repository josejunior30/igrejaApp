package com.esibape.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
	@Table(name="tb_Aluno_Status")
	public class AlunoStatus implements Serializable{

		private static final long serialVersionUID = 1L;
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		private String pendencia;
		@OneToMany(mappedBy ="alunoStatus" )
		private List<Alunos>alunos = new ArrayList<>();
		
		public AlunoStatus() {
			
		}


		

		public AlunoStatus(Long id, String pendencia, List<Alunos> alunos) {
			super();
			this.id = id;
			this.pendencia = pendencia;
			this.alunos = alunos;
		}




		public Long getId() {
			return id;
		}


		public void setId(Long id) {
			this.id = id;
		}


		public String getPendencia() {
			return pendencia;
		}


		public void setPendencia(String pendencia) {
			this.pendencia = pendencia;
		}




		public List<Alunos> getAlunos() {
			return alunos;
		}




		public void setAlunos(List<Alunos> alunos) {
			this.alunos = alunos;
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
			AlunoStatus other = (AlunoStatus) obj;
			return Objects.equals(id, other.id);
		}
		
	}


