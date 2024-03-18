package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;
import com.esibape.entities.Projetos;

public class AlunosDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private LocalDate dataNascimento;
	private String idade;
	private String rg;
	private String responsavel;
	private String cpfResponsavel;
	private String telefone;
	private String url;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;
	
	
	private ProjetosDTO projetos;
	
	public AlunosDTO() {
		
		
	}

	public AlunosDTO(Alunos entity) {
		
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.dataNascimento = entity.getDataNascimento();
		this.idade = entity.getIdade();
		this.rg = entity.getRg();
		this.responsavel = entity.getResponsavel();
		this.cpfResponsavel = entity.getCpfResponsavel();
		this.url= entity.getUrl();
		this.telefone= entity.getTelefone();
		this.rua= entity.getRua();
		this.bairro = entity.getBairro();
		this.cidade = entity.getCidade();
		this.cep= entity.getCep();
		this.complemento =entity.getComplemento();
		this.numero=entity.getNumero();
	}
	
	private List<ChamadaDTO> chamada = new ArrayList<>();
	
		
	public AlunosDTO(Alunos entity, Projetos projetos, List<Chamada>chamada) {
		
		this(entity);
		this.projetos = new ProjetosDTO (projetos);
		chamada.forEach(cha-> this.chamada.add(new ChamadaDTO(cha)));
		
		
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

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getIdade() {
		return idade;
	}

	public void setIdade(String idade) {
		this.idade = idade;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

	public String getCpfResponsavel() {
		return cpfResponsavel;
	}

	public void setCpfResponsavel(String cpfResponsavel) {
		this.cpfResponsavel = cpfResponsavel;
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

	public ProjetosDTO getProjetos() {
		return projetos;
	}

	public void setProjetos(ProjetosDTO projetos) {
		this.projetos = projetos;
	}
	

	
	public void setChamada(List<ChamadaDTO> chamada) {
		this.chamada = chamada;
	}

	public List<ChamadaDTO> getChamada() {
		return chamada;
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
		AlunosDTO other = (AlunosDTO) obj;
		return Objects.equals(id, other.id);
	}


	
	
}
