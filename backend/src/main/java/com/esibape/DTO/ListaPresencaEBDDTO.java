package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import com.esibape.entities.ChamadaMembro;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;



public class ListaPresencaEBDDTO implements Serializable{
	private static final long serialVersionUID = 1L;
		
	private Long id;
	private LocalDate data; 
	private MembroDTO membro ;
	private EBDCursoDTO ebdCurso; 
	  private ChamadaMembro chamadaMembro; 
	
	  ListaPresencaEBDDTO(){
		
	}



	public ListaPresencaEBDDTO(ListaPresencaEBD entity) {
		
		this.id = entity.getId();
		this.data = entity.getData();
		this.chamadaMembro = entity.getChamadaMembro();

	}
	public ListaPresencaEBDDTO(ListaPresencaEBD entity, Membro membro, EBDCurso ebdCurso) {
		this(entity);
		this.membro = new MembroDTO(membro);
		this.ebdCurso = new EBDCursoDTO(ebdCurso);

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



	public EBDCursoDTO getEbdCurso() {
		return ebdCurso;
	}



	public void setEbdCurso(EBDCursoDTO ebdCurso) {
		this.ebdCurso = ebdCurso;
	}



	public ChamadaMembro getChamadaMembro() {
		return chamadaMembro;
	}




	public void setChamadaMembro(ChamadaMembro chamadaMembro) {
		this.chamadaMembro = chamadaMembro;
	}


	public MembroDTO getMembro() {
		return membro;
	}


	public void setMembro(MembroDTO membro) {
		this.membro = membro;
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
		ListaPresencaEBDDTO other = (ListaPresencaEBDDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
	