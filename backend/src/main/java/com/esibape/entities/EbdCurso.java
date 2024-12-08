package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Lob;


@Entity
public class EbdCurso implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Lob
    private byte[] pdfDeEstudo; // Para armazenar o PDF em formato binário.

    
    public EbdCurso() {
    	
    	
    }


	public EbdCurso(Long id, String nome, byte[] pdfDeEstudo) {
		super();
		this.id = id;
		this.nome = nome;
		
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




	public long getSerialVersionUID() {
		return serialVersionUID;
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
		EbdCurso other = (EbdCurso) obj;
		return Objects.equals(id, other.id);
	}
    
    
}