package com.esibape.DTO;

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
import com.esibape.entities.EBDCurso;
import com.esibape.entities.MembroEstado;
import com.esibape.entities.Visitante;
import com.esibape.entities.VisitanteStatus;


public class VisitanteDTO {

    private Long id;
	@Size(min=3, message="O nome deve ter no minimo 3 caracteres")
    @NotEmpty(message="campo não poe ser nulo ou vazio")
    private String nome;
    private String sobrenome;
    private Integer idade;
	@Email(message="Deve ser um Email Valido")
    private String email;
    private String telefone;
	@PastOrPresent(message="escolha uma data válida") 
    private LocalDate dataNascimento;
	private String opcaoCurso;
	private Boolean apostila = false;
	Set<EBDCursoDTO>ebdCursoVisitante = new HashSet<>();
    private List<ListaPresencaVisitanteEBDDTO> listaPresencaVisitanteEBD = new ArrayList<>();
    
    private String cpf;
	private MembroEstado estadoCivil;
	private String rua;
	private String cep;
	private String numero;
	private String bairro;
	private String cidade;
	private String complemento;
	private String url;

	
	private VisitanteStatus visitanteStatus;


    // Construtor padrão
    public VisitanteDTO() {
    }

    // Construtor com parâmetros
  

    // Construtor com entidade
    public VisitanteDTO(Visitante entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.sobrenome = entity.getSobrenome();
        this.dataNascimento = entity.getDataNascimento();
        this.email = entity.getEmail();
        this.telefone = entity.getTelefone();
        this.idade = entity.getIdade();
        this.opcaoCurso =entity.getOpcaoCurso();
        this.apostila = entity.getApostila();
        this.cidade = entity.getCidade();
        this.bairro = entity.getBairro();
        this.rua = entity.getRua();
        this.numero= entity.getNumero();
        this.cep = entity.getCep();
        this.visitanteStatus = entity.getVisitanteStatus();
        this.estadoCivil = entity.getEstadoCivil();
        this.complemento = entity.getComplemento();
        this.url = entity.getUrl();
    
       
    }

 // Construtor com entidade e listas adicionais
    public VisitanteDTO(Visitante entity, Set<EBDCurso>ebdCursoVisitante) {
        this(entity);
      
        ebdCursoVisitante.forEach(cat-> this.ebdCursoVisitante.add(new EBDCursoDTO(cat)));
      
        }
    

    // Getters e Setters
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

    public Boolean getApostila() {
		return apostila;
	}

	public void setApostila(Boolean apostila) {
		this.apostila = apostila;
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

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }


	public Set<EBDCursoDTO> getEbdCursoVisitante() {
		return ebdCursoVisitante;
	}

	public void setEbdCursoVisitante(Set<EBDCursoDTO> ebdCursoVisitante) {
		this.ebdCursoVisitante = ebdCursoVisitante;
	}

	public String getOpcaoCurso() {
		return opcaoCurso;
	}

	public void setOpcaoCurso(String opcaoCurso) {
		this.opcaoCurso = opcaoCurso;
	}

	public List<ListaPresencaVisitanteEBDDTO> getListaPresencaVisitanteEBD() {
        return listaPresencaVisitanteEBD;
    }

    public void setListaPresencaVisitanteEBD(List<ListaPresencaVisitanteEBDDTO> listaPresencaVisitanteEBD) {
        this.listaPresencaVisitanteEBD = listaPresencaVisitanteEBD;
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

	@Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        VisitanteDTO other = (VisitanteDTO) obj;
        return Objects.equals(id, other.id);
    }
}
