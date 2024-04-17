package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;
import com.esibape.entities.Projetos;
import com.esibape.entities.Relatorio;

public class ProjetosDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String lider;
	private String coordenador;
	private String foto_coordenador;
	private String foto_lider;
	private List<AlunosDTO>alunos = new ArrayList<>();
	private List<ChamadaDTO> chamada=  new ArrayList<>();
	private List<RelatorioDTO> relatorio = new ArrayList<>();

	

	public ProjetosDTO() {
		
	}

	
	
	public ProjetosDTO(Long id, String nome, String lider,
			String coordenador,String foto_lider, String foto_coordenador, List<AlunosDTO> alunos, List<RelatorioDTO>relatorio) {
		super();
		this.id = id;
		this.nome = nome;
		this.lider = lider;
		this.alunos = alunos;
		this.foto_coordenador= foto_coordenador;
		this.foto_lider= foto_lider;
	}
	
	public ProjetosDTO(Projetos entity) {
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.lider = entity.getLider();
		this.coordenador= entity.getCoordenador();
		this.foto_coordenador= entity.getFoto_coordenador();
		this.foto_lider = entity.getFoto_lider();
		
		
	}
	

	public ProjetosDTO(Projetos entity, List<Alunos>alunos, List<Chamada>chamada, List<Relatorio> relatorio) {
		this(entity);
		alunos.forEach(x-> this.alunos.add(new AlunosDTO(x)));
		chamada.forEach(y-> this.chamada.add(new ChamadaDTO(y)));
		relatorio.forEach(z-> this.relatorio.add(new RelatorioDTO(z)));
	
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

	public String getLider() {
		return lider;
	}

	public void setLider(String lider) {
		this.lider = lider;
	}
	

	public List<AlunosDTO> getAlunos() {
		return alunos;
	}

	public void setAlunos(List<AlunosDTO> alunos) {
		this.alunos = alunos;
	}
	
	public String getCoordenador() {
		return coordenador;
	}

	public void setCoordenador(String coordenador) {
		this.coordenador = coordenador;
	}

	public String getFoto_coordenador() {
		return foto_coordenador;
	}

	public void setFoto_coordenador(String foto_coordenador) {
		this.foto_coordenador = foto_coordenador;
	}

	public String getFoto_lider() {
		return foto_lider;
	}

	public void setFoto_lider(String foto_lider) {
		this.foto_lider = foto_lider;
	}
	

	public List<ChamadaDTO> getChamada() {
		return chamada;
	}

	public void setChamada(List<ChamadaDTO> chamada) {
		this.chamada = chamada;
	}
	

	public List<RelatorioDTO> getRelatorio() {
		return relatorio;
	}

	public void setRelatorio(List<RelatorioDTO> relatorio) {
		this.relatorio = relatorio;
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
		ProjetosDTO other = (ProjetosDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
