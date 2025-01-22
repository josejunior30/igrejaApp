package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.EbdEstudos;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;
import com.esibape.entities.Visitante;
import com.fasterxml.jackson.annotation.JsonIgnore;


public class EBDCursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;

    private CursoDTO curso;
    private String resumo;
    private int quantidade;
	private List <EbdEstudosDTO> ebdEstudos = new ArrayList<>();
	private Set<MembroDTO> membro = new HashSet<>();
    private Set<VisitanteDTO> visitante = new HashSet<>();
	
		
	@JsonIgnore
	private List<ListaPresencaEBDDTO> listaPresencaEBD = new ArrayList<>();
	public EBDCursoDTO() {
		
		
	}

	public void setCurso(CursoDTO curso) {
		this.curso = curso;
	}




	public EBDCursoDTO(EBDCurso ebdCurso) {
        this.id = ebdCurso.getId();
        this.nome = ebdCurso.getNome();
        this.resumo = ebdCurso.getResumo();
        this.membro = ebdCurso.getMembro().stream()
                .map(MembroDTO::new)
                .collect(Collectors.toSet());
        this.visitante=ebdCurso.getVisitante().stream()
        		.map(VisitanteDTO::new)
        		.collect(Collectors.toSet());
 
    }

	public EBDCursoDTO(EBDCurso entity, List<EbdEstudos> ebdEstudos, List<Membro> membro, Set<Visitante> visitante, List<ListaPresencaEBD> listaPresencaEBD) {
	    this(entity);

	    // Mapeamento de EbdEstudos para EbdEstudosDTO
	    this.ebdEstudos = ebdEstudos.stream()
	            .map(EbdEstudos -> new EbdEstudosDTO(EbdEstudos))
	            .collect(Collectors.toList());


	    
        visitante.forEach(cat-> this.visitante.add(new VisitanteDTO(cat)));
        
	    // Mapeamento de ListaPresencaEBD para ListaPresencaEBDDTO
	    this.listaPresencaEBD = listaPresencaEBD.stream()
	            .map(ListaPresencaEBD -> new ListaPresencaEBDDTO(ListaPresencaEBD))
	            .collect(Collectors.toList());
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



	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}

	public String getResumo() {
		return resumo;
	}

	public void setResumo(String resumo) {
		this.resumo = resumo;
	}

	public List<EbdEstudosDTO> getEbdEstudos() {
		return ebdEstudos;
	}


	public List<ListaPresencaEBDDTO> getListaPresencaEBD() {
		return listaPresencaEBD;
	}

	public void setListaPresencaEBD(List<ListaPresencaEBDDTO> listaPresencaEBD) {
		this.listaPresencaEBD = listaPresencaEBD;
	}


	public Set<VisitanteDTO> getVisitante() {
		return visitante;
	}

	public void setVisitante(Set<VisitanteDTO> visitante) {
		this.visitante = visitante;
	}

	

	public Set<MembroDTO> getMembro() {
		return membro;
	}

	public void setMembro(Set<MembroDTO> membro) {
		this.membro = membro;
	}

	public void setEbdEstudos(List<EbdEstudosDTO> ebdEstudos) {
		this.ebdEstudos = ebdEstudos;
	}



	public CursoDTO getCurso() {
		return curso;
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
		EBDCursoDTO other = (EBDCursoDTO) obj;
		return Objects.equals(id, other.id);
	}

	
	
	
}
