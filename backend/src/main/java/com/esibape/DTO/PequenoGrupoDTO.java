package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.esibape.entities.Membro;
import com.esibape.entities.PequenoGrupo;
import com.esibape.entities.Visitante;

public class PequenoGrupoDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private String apelido;
	private String lider;
	
	public PequenoGrupoDTO() {
		
	}
	
	private List<MembroDTO> membros= new ArrayList<>();
	private List<VisitanteDTO> visitantes= new ArrayList<>();
	
	public PequenoGrupoDTO(Long id, String nome, String apelido, String lider) {
		super();
		this.id = id;
		this.nome = nome;
		this.apelido = apelido;
		this.lider = lider;
	}

	public Long getId() {
		return id;
	}
	public PequenoGrupoDTO(PequenoGrupo entity) {
		this.id= entity.getId();
		this.nome= entity.getNome();
		this.apelido= entity.getApelido();
		this.lider = entity.getLider();
	}
	
	public PequenoGrupoDTO(PequenoGrupo entity, List<Membro> membros, List<Visitante> visitantes) {
		this(entity);
		membros.forEach(pg-> this.membros.add(new MembroDTO(pg)));
		visitantes.forEach(v -> this.visitantes.add(new VisitanteDTO(v)));

		return;
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

	public String getApelido() {
		return apelido;
	}

	public void setApelido(String apelido) {
		this.apelido = apelido;
	}

	public String getLider() {
		return lider;
	}

	public void setLider(String lider) {
		this.lider = lider;
	}
	

	public List<MembroDTO> getMembros() {
		return membros;
	}

	public void setMembros(List<MembroDTO> membros) {
		this.membros = membros;
	}
	
	

	public List<VisitanteDTO> getVisitantes() {
		return visitantes;
	}

	public void setVisitantes(List<VisitanteDTO> visitantes) {
		this.visitantes = visitantes;
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
		PequenoGrupoDTO other = (PequenoGrupoDTO) obj;
		return Objects.equals(id, other.id);
	}

	public void addVisitante(Visitante visitante) {
		// TODO Auto-generated method stub
		
	}


	

}
