package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import javax.persistence.Table;

@Entity
@Table(name="tb_alunos")
public class Alunos implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private LocalDate dataNascimento;
	private Integer idade;
	private String rg;
	private String responsavel;
	private String cpfResponsavel;
	private String telefone;
	private String email;
	private String url;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;
	private String pergunta;
	private String sangue;
	private LocalTime horario;
	private AlunoDoenca alunoDoenca;
	@OneToMany(mappedBy ="alunosPG"  )
    private List<Pagamento> pagamentos = new ArrayList<>();
	@ManyToOne()
	@JoinColumn(name= "status_id")
	private AlunoStatus alunoStatus;
	
	@ManyToOne()
	@JoinColumn(name= "projeto_id")
	private Projetos projetos;
	
	 @OneToMany(mappedBy = "alunos", cascade = CascadeType.ALL)
	private List<Chamada> chamada = new ArrayList<>();
	 
	
	 public Alunos() {
		
		
	}
	
	



	public Alunos(Long id, String nome, LocalDate dataNascimento, Integer idade, String rg, String responsavel,
			String cpfResponsavel, String telefone, String email, String url, String rua, String cep, String numero,
			String bairro, String cidade, String complemento, String pergunta, String sangue, LocalTime horario,
			AlunoDoenca alunoDoenca, List<Pagamento> pagamentos, AlunoStatus alunoStatus, Projetos projetos,
			List<Chamada> chamada) {
		super();
		this.id = id;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.idade = idade;
		this.rg = rg;
		this.responsavel = responsavel;
		this.cpfResponsavel = cpfResponsavel;
		this.telefone = telefone;
		this.email = email;
		this.url = url;
		this.rua = rua;
		this.cep = cep;
		this.numero = numero;
		this.bairro = bairro;
		this.cidade = cidade;
		this.complemento = complemento;
		this.pergunta = pergunta;
		this.sangue = sangue;
		this.horario = horario;
		this.alunoDoenca = alunoDoenca;
		this.pagamentos = pagamentos;
		this.alunoStatus = alunoStatus;
		this.projetos = projetos;
		this.chamada = chamada;
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
	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public Projetos getProjetos() {
		return projetos;
	}

	public void setProjetos(Projetos projetos) {
		this.projetos = projetos;
	}
	

	public List<Chamada> getChamada() {
		return chamada;
	}








	public List<Pagamento> getPagamentos() {
		return pagamentos;
	}





	public void setPagamentos(List<Pagamento> pagamentos) {
		this.pagamentos = pagamentos;
	}





	public LocalTime getHorario() {
		return horario;
	}

	public void setHorario(LocalTime horario) {
		this.horario = horario;
	}

	public void setChamada(List<Chamada> chamada) {
		this.chamada = chamada;
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
	
	public AlunoStatus getAlunoStatus() {
		return alunoStatus;
	}

	public void setAlunoStatus(AlunoStatus alunoStatus) {
		this.alunoStatus = alunoStatus;
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
		Alunos other = (Alunos) obj;
		return Objects.equals(id, other.id);
	}

	
}
