package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import com.esibape.entities.AlunoDoenca;
import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;
import com.esibape.entities.Projetos;

public class AlunosDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	@Size(min=3, message="O nome deve ter no minimo 3 caracteres")
    @NotEmpty(message="campo não poe ser nulo ou vazio")
	private String nome;
	@PastOrPresent(message="escolha uma data válida") 
	private LocalDate dataNascimento;
	private Integer idade;
	private String rg;
	private String responsavel;
	private String cpfResponsavel;
	private String telefone;
	private String url;
	private String email;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;
	private String pergunta;
	private String sangue;
	private AlunoDoenca alunoDoenca;
	
	private ProjetosDTO projetos;
	
	public AlunosDTO() {
		
		
	}
	

	public AlunosDTO(Long id, String nome, LocalDate dataNascimento, Integer idade, String rg, String responsavel,
			String cpfResponsavel, String telefone, String url,String email ,String rua, String cep, String numero, String bairro,
			String cidade, String complemento, String pergunta, String sangue, AlunoDoenca alunoDoenca,
			ProjetosDTO projetos, List<ChamadaDTO> chamada) {
		super();
		this.id = id;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.idade = idade;
		this.rg = rg;
		this.responsavel = responsavel;
		this.cpfResponsavel = cpfResponsavel;
		this.telefone = telefone;
		this.url = url;
		this.email= email;
		this.rua = rua;
		this.cep = cep;
		this.numero = numero;
		this.bairro = bairro;
		this.cidade = cidade;
		this.complemento = complemento;
		this.pergunta = pergunta;
		this.sangue = sangue;
		this.alunoDoenca = alunoDoenca;
		this.projetos = projetos;
		this.chamada = chamada;
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
		this.email = entity.getEmail();
		this.rua= entity.getRua();
		this.bairro = entity.getBairro();
		this.cidade = entity.getCidade();
		this.cep= entity.getCep();
		this.complemento =entity.getComplemento();
		this.numero=entity.getNumero();
		this.alunoDoenca= entity.getAlunoDoenca();
		this.sangue = entity.getSangue();
		this.pergunta = entity.getPergunta();
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

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}
	
	

	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
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
	

	
	public String getPergunta() {
		return pergunta;
	}


	public void setPergunta(String pergunta) {
		this.pergunta = pergunta;
	}


	public String getSangue() {
		return sangue;
	}


	public void setSangue(String sangue) {
		this.sangue = sangue;
	}


	public AlunoDoenca getAlunoDoenca() {
		return alunoDoenca;
	}


	public void setAlunoDoenca(AlunoDoenca alunoDoenca) {
		this.alunoDoenca = alunoDoenca;
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
