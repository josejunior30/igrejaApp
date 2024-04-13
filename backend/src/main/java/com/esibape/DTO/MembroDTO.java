package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


import com.esibape.entities.FileStorage;
import com.esibape.entities.Membro;
import com.esibape.entities.MembroEstado;
import com.esibape.entities.PequenoGrupo;

public class MembroDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	private String sobrenome;
	private String email;
	private LocalDate dataNascimento;
	private Integer idade;
	private String telefone;
	private String url;
	private String cpf;
	private MembroEstado estadoCivil;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;

	
	private PequenoGrupoDTO pequenoGrupo;

	public MembroDTO() {
		
	}

	
	public MembroDTO(Long id, String nome, String sobrenome, String email, LocalDate dataNascimento, Integer idade,
			String telefone, String url, String cpf, MembroEstado estadoCivil, String rua, String cep, String numero,
			String bairro, String cidade, String complemento, PequenoGrupoDTO pequenoGrupo ) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.email = email;
		this.dataNascimento = dataNascimento;
		this.idade = idade;
		this.telefone = telefone;
		this.url = url;
		this.cpf = cpf;
		this.estadoCivil = estadoCivil;
		this.rua = rua;
		this.cep = cep;
		this.numero = numero;
		this.bairro = bairro;
		this.cidade = cidade;
		this.complemento = complemento;
		this.pequenoGrupo = pequenoGrupo;
	
	}

	public MembroDTO(Membro entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
		this.sobrenome=entity.getSobrenome();
		this.email= entity.getEmail();
		this.dataNascimento= entity.getDataNascimento();
		this.idade = entity.getIdade();
		this.telefone = entity.getTelefone();
		this.url=entity.getUrl();
		this.cpf=entity.getCpf();
		this.estadoCivil=entity.getEstadoCivil();
		this.bairro= entity.getBairro();
		this.cep=entity.getCep();
		this.cidade= entity.getCidade();
		this.complemento= entity.getComplemento();
		this.rua=entity.getRua();
		this.numero=entity.getNumero();
	
	
		
		
	}
	public MembroDTO(Membro entity, PequenoGrupo pequenoGrupo) {
		this(entity);
		this.pequenoGrupo = new PequenoGrupoDTO(pequenoGrupo);
		
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


	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public LocalDate getDataNascimento() {
		return dataNascimento;
	}


	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	
	

	public Integer getIdade() {
		return idade;
	}


	public void setIdade(Integer idade) {
		this.idade = idade;
	}



	public String getTelefone() {
		return telefone;
	}


	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	

	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}

	
	public String getCpf() {
		return cpf;
	}


	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
		

	public MembroEstado getEstadoCivil() {
		return estadoCivil;
	}


	public void setEstadoCivil(MembroEstado estadoCivil) {
		this.estadoCivil = estadoCivil;
	}


	public PequenoGrupoDTO getPequenoGrupo() {
		return pequenoGrupo;
	}


	public void setPequenoGrupo(PequenoGrupoDTO pequenoGrupo) {
		this.pequenoGrupo = pequenoGrupo;
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
		MembroDTO other = (MembroDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
