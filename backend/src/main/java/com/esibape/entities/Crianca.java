package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name= "tb_crianca")
public class Crianca implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private Long id;
	@JsonProperty("nome")
	private String nome;
	private String sobrenome;
	private LocalDate dataNascimento;
	private Integer idade;
	private String telefone;
	private String url;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;
	private Boolean status =true;
	 
	
	public Crianca() {
		
	}
	

	public Crianca(Long id, String nome, String sobrenome, LocalDate dataNascimento, Integer idade, String telefone,
			String url, String rua, String cep, String numero, String bairro, String cidade, String complemento,
			Boolean status) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.dataNascimento = dataNascimento;
		this.idade = idade;
		this.telefone = telefone;
		this.url = url;
		this.rua = rua;
		this.cep = cep;
		this.numero = numero;
		this.bairro = bairro;
		this.cidade = cidade;
		this.complemento = complemento;
		this.status = status;
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



	public String getRua() {
		return rua;
	}


	public void setRua(String rua) {
		this.rua = rua;
	}


	public String getCep() {
		return cep;
	}


	public void setCep(String cep) {
		this.cep = cep;
	}


	public String getNumero() {
		return numero;
	}


	public void setNumero(String numero) {
		this.numero = numero;
	}


	public String getBairro() {
		return bairro;
	}


	public void setBairro(String bairro) {
		this.bairro = bairro;
	}


	public String getCidade() {
		return cidade;
	}


	public void setCidade(String cidade) {
		this.cidade = cidade;
	}


	public String getComplemento() {
		return complemento;
	}


	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}


	
	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}



	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
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
		Crianca other = (Crianca) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
