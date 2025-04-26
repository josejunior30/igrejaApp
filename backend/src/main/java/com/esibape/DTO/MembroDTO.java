package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import com.esibape.entities.CargoMembro;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;
import com.esibape.entities.MembroEstado;
import com.esibape.entities.MembroStatus;
import com.esibape.entities.MembroTipo;




public class MembroDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	@Size(min=3, message="O nome deve ter no minimo 3 caracteres")
    @NotEmpty(message="campo não poe ser nulo ou vazio")
	private String nome;
	private String sobrenome;
	@Email(message="Deve ser um Email Valido")
	private String email;
	@PastOrPresent(message="escolha uma data válida") 
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
	private Boolean apostila = false;
	private String opcaoCurso;
	private LocalDate desligamento;
	private Integer ano;
	
	private MembroStatus membroStatus;
	
	private MembroTipo membroTipo;
Set<CargoMembroDTO>cargoMembro = new HashSet<>();
	Set<EBDCursoDTO>ebdCurso = new HashSet<>();
	   
	private List<ListaPresencaEBDDTO> listaPresencaEBD = new ArrayList<>();
	
	public MembroDTO() {
		
	}

	public MembroDTO(Membro entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
		this.sobrenome=entity.getSobrenome();
		this.email= entity.getEmail();
		this.dataNascimento= entity.getDataNascimento();
		this.idade = entity.getIdade();
		this.telefone = entity.getTelefone();
		this.cpf=entity.getCpf();
		this.estadoCivil=entity.getEstadoCivil();
		this.bairro= entity.getBairro();
		this.cep=entity.getCep();
		this.cidade= entity.getCidade();
		this.complemento= entity.getComplemento();
		this.rua=entity.getRua();
		this.numero=entity.getNumero();
		this.opcaoCurso =entity.getOpcaoCurso();
		this.url=entity.getUrl();
		this.apostila= entity.getApostila();
		this.desligamento=entity.getDesligamento();
		this.membroStatus =entity.getMembroStatus();
		this.ano =entity.getAno();
		this.membroTipo= entity.getMembroTipo();
		  
        
	}
	
	 public MembroDTO(Membro entity, Set<EBDCurso>ebdCurso, Set<CargoMembro>cargoMembro ) {
	        this(entity);
	      
	  
	        ebdCurso.forEach(cat-> this.ebdCurso.add(new EBDCursoDTO(cat)));
	        cargoMembro.forEach(cat2-> this.cargoMembro.add(new CargoMembroDTO(cat2)));
		      
	      
	        }
	    

	public Set<EBDCursoDTO> getEbdCurso() {
		return ebdCurso;
	}

	public void setEbdCurso(Set<EBDCursoDTO> ebdCurso) {
		this.ebdCurso = ebdCurso;
	}

	public String getOpcaoCurso() {
		return opcaoCurso;
	}



	public void setOpcaoCurso(String opcaoCurso) {
		this.opcaoCurso = opcaoCurso;
	}




	public Set<CargoMembroDTO> getCargoMembro() {
		return cargoMembro;
	}

	public void setCargoMembro(Set<CargoMembroDTO> cargoMembro) {
		this.cargoMembro = cargoMembro;
	}

	public MembroDTO(Membro entity, List<ListaPresencaEBD>listaPresencaEBD) {
		 this(entity);
		  if (listaPresencaEBD !=null) {
			  listaPresencaEBD.forEach(pg-> this.listaPresencaEBD.add(new ListaPresencaEBDDTO(pg)));
	        }
		
	}

	public Long getId() {
		return id;
	}


	public Boolean getApostila() {
		return apostila;
	}



	public void setApostila(Boolean apostila) {
		this.apostila = apostila;
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


	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
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


	public List<ListaPresencaEBDDTO> getListaPresencaEBD() {
		return listaPresencaEBD;
	}



	public void setListaPresencaEBD(List<ListaPresencaEBDDTO> listaPresencaEBD) {
		this.listaPresencaEBD = listaPresencaEBD;
	}




	public LocalDate getDesligamento() {
		return desligamento;
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

	
	public LocalDate getDataNascimento() {
		return dataNascimento;
	}


	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	
	

	public MembroTipo getMembroTipo() {
		return membroTipo;
	}

	public void setMembroTipo(MembroTipo membroTipo) {
		this.membroTipo = membroTipo;
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
