package com.esibape.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;




@Entity
@Table(name="tb_visitante")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Visitante {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String sobrenome;
	private Integer idade;
	private String email;
	private String telefone;
	private LocalDate dataNascimento;
	private Boolean apostila = false;
	private String cpf;
	private MembroEstado estadoCivil;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;
	private String url;

	 @Enumerated(EnumType.STRING)
	private VisitanteStatus visitanteStatus;

	@ManyToMany
	@JoinTable(name="tb_ebd_curso_visitante", joinColumns = 
	@JoinColumn(name= "visitante_id"), inverseJoinColumns = @JoinColumn(name="ebd_curso_id"))

	Set<EBDCurso>ebdCursoVisitante = new HashSet<>();
	
	
    @Column(name="opcao_curso")
	private String opcaoCurso;
	
	@OneToMany(mappedBy = "visitante", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD = new ArrayList<>();
	
	@ManyToMany
	@JoinTable(name="tb_atendimento_visitante", joinColumns =
	@JoinColumn(name= "visitante_id"), inverseJoinColumns = @JoinColumn(name= "atendimento_id"))
	Set<Atendimento>atendimentoVisitante = new HashSet<>();
	
	public Visitante() {
		
		
	}

	public Visitante(Long id, String nome, String sobrenome, Integer idade, String email, String telefone,
			LocalDate dataNascimento, Boolean apostila, String cpf, MembroEstado estadoCivil, String rua, String cep,
			String numero, String bairro, String cidade, String complemento, String url,
			VisitanteStatus visitanteStatus, Set<EBDCurso> ebdCursoVisitante, String opcaoCurso,
			List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD, Set<Atendimento> atendimentoVisitante) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.idade = idade;
		this.email = email;
		this.telefone = telefone;
		this.dataNascimento = dataNascimento;
		this.apostila = apostila;
		this.cpf = cpf;
		this.estadoCivil = estadoCivil;
		this.rua = rua;
		this.cep = cep;
		this.numero = numero;
		this.bairro = bairro;
		this.cidade = cidade;
		this.complemento = complemento;
		this.url = url;
		this.visitanteStatus = visitanteStatus;
		this.ebdCursoVisitante = ebdCursoVisitante;
		this.opcaoCurso = opcaoCurso;
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
		this.atendimentoVisitante = atendimentoVisitante;
	}








	public Set<EBDCurso> getEbdCursoVisitante() {
		return ebdCursoVisitante;
	}


	public void setEbdCursoVisitante(Set<EBDCurso> ebdCursoVisitante) {
		this.ebdCursoVisitante = ebdCursoVisitante;
	}


	public Boolean getApostila() {
		return apostila;
	}


	public void setApostila(Boolean apostila) {
		this.apostila = apostila;
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


	public String getOpcaoCurso() {
		return opcaoCurso;
	}


	public void setOpcaoCurso(String opcaoCurso) {
		this.opcaoCurso = opcaoCurso;
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


	public String getSobrenome() {
		return sobrenome;
	}


	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
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




	public List<ListaPresencaVisitanteEBD> getListaPresencaVisitanteEBD() {
		return listaPresencaVisitanteEBD;
	}





	public Set<Atendimento> getAtendimentoVisitante() {
		return atendimentoVisitante;
	}

	public void setAtendimentoVisitante(Set<Atendimento> atendimentoVisitante) {
		this.atendimentoVisitante = atendimentoVisitante;
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



	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}



	public VisitanteStatus getVisitanteStatus() {
		return visitanteStatus;
	}



	public void setVisitanteStatus(VisitanteStatus visitanteStatus) {
		this.visitanteStatus = visitanteStatus;
	}



	public void setListaPresencaVisitanteEBD(List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD) {
		this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
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
		Visitante other = (Visitante) obj;
		return Objects.equals(id, other.id);
	}

	
	

}
