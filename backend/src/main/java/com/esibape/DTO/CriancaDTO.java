package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import com.esibape.entities.Crianca;
import com.esibape.entities.CriancaStatus;
import com.esibape.entities.MembroStatus;



public class CriancaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
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
	private CriancaStatus criancaStatus;
	private MembroStatus membroStatus;
	private String responsavel;
	
	public CriancaDTO() {
		
	}
	
	public CriancaDTO( Crianca entity ) {
		
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.sobrenome = entity.getSobrenome();
		this.dataNascimento = entity.getDataNascimento();
		this.idade =  entity.getIdade();
		this.telefone = entity.getTelefone();
		this.url = entity.getUrl();
		this.bairro =entity.getBairro();
		this.cep =entity.getCep();
		this.cidade=entity.getCidade();
		this.complemento =entity.getComplemento();
		this.rua =entity.getRua();
		this.numero=entity.getNumero();
		this.responsavel =entity.getResponsavel();
		this.membroStatus =entity.getMembroStatus();
		this.criancaStatus=entity.getCriancaStatus();
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

	public String getSobrenome() {
		return sobrenome;
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




	public CriancaStatus getCriancaStatus() {
		return criancaStatus;
	}

	public void setCriancaStatus(CriancaStatus criancaStatus) {
		this.criancaStatus = criancaStatus;
	}

	public MembroStatus getMembroStatus() {
		return membroStatus;
	}

	public void setMembroStatus(MembroStatus membroStatus) {
		this.membroStatus = membroStatus;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
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
		CriancaDTO other = (CriancaDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
