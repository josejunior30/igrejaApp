package com.esibape.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name="tb_ebd_curso")
public class EBDCurso implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	
	@ManyToOne()
	@JoinColumn(name= "curso_id")
	@JsonBackReference(value = "curso-ebdcurso")
    private Curso curso;
	
	@Column(columnDefinition = "TEXT")
	private String resumo;

	@ManyToMany(mappedBy = "ebdCurso")
    private List<Membro> membro = new ArrayList<>();
	

	@ManyToMany(mappedBy = "ebdCursoVisitante")
	private Set<Visitante> visitante = new HashSet<>(); 
	
	
	@OneToMany(mappedBy ="ebdCurso")
	private List <ListaPresencaEBD> listaPresencaEBD = new ArrayList<>();
	
	@OneToMany(mappedBy ="ebdCurso")
	private List <ListaPresencaEBD> listaPresencaVisitanteEBD = new ArrayList<>();
	
	@OneToMany(mappedBy ="ebdCurso")
	@JsonIgnore
	private List <EbdEstudos> ebdEstudos = new ArrayList<>();
	
	public EBDCurso() {
		
		
	}


	public EBDCurso(Long id, String nome, Curso curso, String resumo, List<Membro> membro, Set<Visitante> visitante,
			List<ListaPresencaEBD> listaPresencaEBD, List<ListaPresencaEBD> listaPresencaVisitanteEBD,
			List<EbdEstudos> ebdEstudos) {
		super();
		this.id = id;
		this.nome = nome;
		this.curso = curso;
		this.resumo = resumo;
		this.membro = membro;
		this.visitante = visitante;
		this.listaPresencaEBD = listaPresencaEBD;
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
		this.ebdEstudos = ebdEstudos;
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




	public Curso getCurso() {
		return curso;
	}


	public void setCurso(Curso curso) {
		this.curso = curso;
	}




	public String getResumo() {
		return resumo;
	}



	public void setResumo(String resumo) {
		this.resumo = resumo;
	}



	public List<EbdEstudos> getEbdEstudos() {
		return ebdEstudos;
	}


	public void setEbdEstudos(List<EbdEstudos> ebdEstudos) {
		this.ebdEstudos = ebdEstudos;
	}


	public List<Membro> getMembro() {
		return membro;
	}





	public List<ListaPresencaEBD> getListaPresencaEBD() {
		return listaPresencaEBD;
	}



	public void setListaPresencaEBD(List<ListaPresencaEBD> listaPresencaEBD) {
		this.listaPresencaEBD = listaPresencaEBD;
	}



	public void setMembro(List<Membro> membro) {
		this.membro = membro;
	}


	public Set<Visitante> getVisitante() {
		return visitante;
	}


	public void setVisitante(Set<Visitante> visitante) {
		this.visitante = visitante;
	}


	public List<ListaPresencaEBD> getListaPresencaVisitanteEBD() {
		return listaPresencaVisitanteEBD;
	}






	public void setListaPresencaVisitanteEBD(List<ListaPresencaEBD> listaPresencaVisitanteEBD) {
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
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
		EBDCurso other = (EBDCurso) obj;
		return Objects.equals(id, other.id);
	}

	
	
	
}
