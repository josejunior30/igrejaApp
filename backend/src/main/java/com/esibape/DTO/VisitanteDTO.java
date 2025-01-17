package com.esibape.DTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

import com.esibape.entities.ListaPresencaVisitanteEBD;
import com.esibape.entities.Visitante;


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
    private Long cursoId; // ID do Curso para evitar referência completa
    private Long ebdCursoId; // ID do EBDCurso para evitar referência completa
    private List<ListaPresencaVisitanteEBDDTO> listaPresencaVisitanteEBD = new ArrayList<>();

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
        this.cursoId = entity.getCurso() != null ? entity.getCurso().getId() : null;
        this.ebdCursoId = entity.getEbdCursoVisitante() != null ? entity.getEbdCursoVisitante().getId() : null;
    }

    // Construtor com lista adicional
    public VisitanteDTO(Visitante entity, List<ListaPresencaVisitanteEBD> listaPresencaVisitanteEBD) {
        this(entity);
        if (listaPresencaVisitanteEBD != null) {
            listaPresencaVisitanteEBD.forEach(pg -> this.listaPresencaVisitanteEBD.add(new ListaPresencaVisitanteEBDDTO(pg)));
        }
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

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public Long getEbdCursoId() {
        return ebdCursoId;
    }

    public void setEbdCursoId(Long ebdCursoId) {
        this.ebdCursoId = ebdCursoId;
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
