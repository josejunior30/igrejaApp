package com.esibape.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name= "tb_membro")
public class Membro implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private Long id;
 @JsonProperty("nome")
	private String nome;
	private String sobrenome;
	private String email;
	private LocalDate dataNascimento;
	private Integer idade;
	private String telefone;
	private String cpf;
	private MembroEstado estadoCivil;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;
	private String url;
	private LocalDate desligamento;
	private Integer ano;
	private String opcaoCurso;
	private Boolean apostila = false;
	 @Enumerated(EnumType.STRING)
	private MembroStatus membroStatus;
	 @Enumerated(EnumType.STRING)
		private MembroTipo membroTipo;

	
	@ManyToMany
	@JoinTable(name="tb_ebd_curso_membro", joinColumns =
	@JoinColumn(name= "membro_id"), inverseJoinColumns = @JoinColumn(name= "ebd_curso_id"))
	Set<EBDCurso>ebdCurso = new HashSet<>();
	
	@OneToMany(mappedBy = "membro", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<ListaPresencaEBD> listaPresencaEBD = new ArrayList<>();
	
	@OneToOne(mappedBy= "membro", cascade = CascadeType.ALL)
	private FileStorage foto;
	
	public Membro() {
		
	}
	



	public Membro(Long id, String nome, String sobrenome, String email, LocalDate dataNascimento, Integer idade,
			String telefone, String cpf, MembroEstado estadoCivil, String rua, String cep, String numero, String bairro,
			String cidade, String complemento, String url, LocalDate desligamento, Integer ano, String opcaoCurso,
			Boolean apostila, MembroStatus membroStatus, MembroTipo membroTipo, Set<EBDCurso> ebdCurso,
			List<ListaPresencaEBD> listaPresencaEBD, FileStorage foto) {
		super();
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.email = email;
		this.dataNascimento = dataNascimento;
		this.idade = idade;
		this.telefone = telefone;
		this.cpf = cpf;
		this.estadoCivil = estadoCivil;
		this.rua = rua;
		this.cep = cep;
		this.numero = numero;
		this.bairro = bairro;
		this.cidade = cidade;
		this.complemento = complemento;
		this.url = url;
		this.desligamento = desligamento;
		this.ano = ano;
		this.opcaoCurso = opcaoCurso;
		this.apostila = apostila;
		this.membroStatus = membroStatus;
		this.membroTipo = membroTipo;
		this.ebdCurso = ebdCurso;
		this.listaPresencaEBD = listaPresencaEBD;
		this.foto = foto;
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

	

	public LocalDate getDesligamento() {
		return desligamento;
	}






	public MembroTipo getMembroTipo() {
		return membroTipo;
	}








	public void setMembroTipo(MembroTipo membroTipo) {
		this.membroTipo = membroTipo;
	}








	public void setDesligamento(LocalDate desligamento) {
		this.desligamento = desligamento;
	}







	public Integer getAno() {
		return ano;
	}




	public void setAno(Integer ano) {
		this.ano = ano;
	}




	public MembroStatus getMembroStatus() {
		return membroStatus;
	}








	public void setMembroStatus(MembroStatus membroStatus) {
		this.membroStatus = membroStatus;
	}








	public Boolean getApostila() {
		return apostila;
	}


	public void setApostila(Boolean apostila) {
		this.apostila = apostila;
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

	public String getOpcaoCurso() {
		return opcaoCurso;
	}


	public void setOpcaoCurso(String opcaoCurso) {
		this.opcaoCurso = opcaoCurso;
	}


	public LocalDate getDataNascimento() {
		return dataNascimento;
	}



	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	
	

	public List<ListaPresencaEBD> getListaPresencaEBD() {
		return listaPresencaEBD;
	}


	public void setListaPresencaEBD(List<ListaPresencaEBD> listaPresencaEBD) {
		this.listaPresencaEBD = listaPresencaEBD;
	}


	public FileStorage getFoto() {
		return foto;
	}

	public void setFoto(FileStorage foto) {
		this.foto = foto;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
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



	public Set<EBDCurso> getEbdCurso() {
		return ebdCurso;
	}


	public void setEbdCurso(Set<EBDCurso> ebdCurso) {
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
		Membro other = (Membro) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
