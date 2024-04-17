package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import com.esibape.entities.Projetos;
import com.esibape.entities.Relatorio;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RelatorioDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private LocalDate data;
	@JsonProperty("A aula ocorreu normalmente?")
	private String pergunta1;
	@JsonProperty("Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?")
    private String pergunta2;
	@JsonProperty("Houve dificuldade com o material das aulas?")
	private String pergunta3;
    @JsonProperty("Alguma sugestão para a equipe de trabalho?")
    private String pergunta4;
	@JsonProperty("Mais alguma observação ou sugestão?")
	private String pergunta5;
	
	private ProjetosDTO projetosRelatorio;
	
	
	
	public RelatorioDTO(Long id, LocalDate data, String pergunta1, String pergunta2, String pergunta3, String pergunta4,
			String pergunta5, ProjetosDTO projetosRelatorio) {
		super();
		this.id = id;
		this.data = data;
		this.pergunta1 = pergunta1;
		this.pergunta2 = pergunta2;
		this.pergunta3 = pergunta3;
		this.pergunta4 = pergunta4;
		this.pergunta5 = pergunta5;
		this.projetosRelatorio = projetosRelatorio;
	}

	public RelatorioDTO(Relatorio entity) {
	    this.id = entity.getId();
	    this.data = entity.getData();
	    this.pergunta1 = entity.getPergunta1();
	    this.pergunta2 = entity.getPergunta2();
	    this.pergunta3 = entity.getPergunta3();
	    this.pergunta4 = entity.getPergunta4();
	    this.pergunta5 = entity.getPergunta5();
	    
	    
	    
	}

	public RelatorioDTO(Relatorio entity, Projetos projetosRelatorio) {
		this(entity);

		this.projetosRelatorio = new ProjetosDTO(projetosRelatorio);
		
	}
	


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	



	public String getPergunta1() {
		return pergunta1;
	}



	public void setPergunta1(String pergunta1) {
		this.pergunta1 = pergunta1;
	}



	public String getPergunta2() {
		return pergunta2;
	}



	public void setPergunta2(String pergunta2) {
		this.pergunta2 = pergunta2;
	}



	public String getPergunta3() {
		return pergunta3;
	}



	public void setPergunta3(String pergunta3) {
		this.pergunta3 = pergunta3;
	}



	public String getPergunta4() {
		return pergunta4;
	}



	public void setPergunta4(String pergunta4) {
		this.pergunta4 = pergunta4;
	}



	public String getPergunta5() {
		return pergunta5;
	}


	public void setPergunta5(String pergunta5) {
		this.pergunta5 = pergunta5;
	}

	public ProjetosDTO getProjetosRelatorio() {
		return projetosRelatorio;
	}



	public void setProjetosRelatorio(ProjetosDTO projetosRelatorio) {
		this.projetosRelatorio = projetosRelatorio;
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
		RelatorioDTO other = (RelatorioDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}	
