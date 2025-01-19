package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="tb_Ebd_Estudos")
public class EbdEstudos implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Lob
    @Column(name = "pdfdeestudo") 
    private byte[] pdfDeEstudo; 
    
	@ManyToOne()
	@JoinColumn(name= "EBD_Curso_id")
    private EBDCurso ebdCurso;
	
    
    public EbdEstudos() {
    	
    	
    }


	public EbdEstudos(Long id, String nome, byte[] pdfDeEstudo, EBDCurso ebdCurso) {
		super();
		this.id = id;
		this.nome = nome;
		this.pdfDeEstudo = pdfDeEstudo;
		this.ebdCurso = ebdCurso;
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


	public byte[] getPdfDeEstudo() {
		return pdfDeEstudo;
	}


	public void setPdfDeEstudo(byte[] pdfDeEstudo) {
		this.pdfDeEstudo = pdfDeEstudo;
	}


	public EBDCurso getEbdCurso() {
		return ebdCurso;
	}


	public void setEbdCurso(EBDCurso ebdCurso) {
		this.ebdCurso = ebdCurso;
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
		EbdEstudos other = (EbdEstudos) obj;
		return Objects.equals(id, other.id);
	}
    
    
}