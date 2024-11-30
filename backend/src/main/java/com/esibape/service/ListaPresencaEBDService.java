package com.esibape.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.CursoDTO;
import com.esibape.DTO.ListaPresencaEBDDTO;
import com.esibape.DTO.MembroDTO;
import com.esibape.DTO.VisitanteDTO;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;
import com.esibape.entities.Curso;
import com.esibape.entities.Visitante;
import com.esibape.repository.CursoRepository;
import com.esibape.repository.ListaPresencaEBDRepository;
import com.esibape.repository.MembroRepository;
import com.esibape.repository.VisitanteRepository;

@Service
public class ListaPresencaEBDService {
	@Autowired
	private ListaPresencaEBDRepository repository;
	
	@Autowired
	private MembroRepository membroRepository;
	
	@Autowired
	private VisitanteRepository visitanteRepository;
	
	@Autowired
	private CursoRepository cursoRepository;
	
	@Transactional(readOnly = true)
	public List<ListaPresencaEBDDTO> findAll() {
		List <ListaPresencaEBD> entity = repository.findAll();
		return  entity.stream()
	               .map(x -> new ListaPresencaEBDDTO(x, x.getMembro(), x.getVisitante(), x.getCurso()))
	               .collect(Collectors.toList());
	}
	
	 @Transactional(readOnly = true)
	    public ListaPresencaEBDDTO findById(Long id) {
	    	Optional<ListaPresencaEBD> ListaPresencaEBD = repository.findById(id);
	    	ListaPresencaEBD entity = ListaPresencaEBD.get();
	    	return  new ListaPresencaEBDDTO(entity, entity.getMembro(), entity.getVisitante(), entity.getCurso()) ;
	    }
	 @Transactional
	    public ListaPresencaEBDDTO insert(ListaPresencaEBDDTO dto){
		 ListaPresencaEBD entity = new ListaPresencaEBD();
		 copyDtoToEntity(dto, entity);
		 entity = repository.save(entity);
	    	return new ListaPresencaEBDDTO(entity);
	    	
	    }

	 @Transactional(readOnly = true)
	    public List<ListaPresencaEBDDTO> findByCursoAndMonth(Long cursoId, int month, int year) {
	        List<ListaPresencaEBD> entityList = repository.findByCursoAndMonth(cursoId, month, year);
	        return entityList.stream()
	                .map(x -> new ListaPresencaEBDDTO(x, x.getMembro(), x.getVisitante(), x.getCurso()))
	                .collect(Collectors.toList());
	    }
	    private void copyDtoToEntity(ListaPresencaEBDDTO dto,ListaPresencaEBD entity) {
			entity.setData(dto.getData());
			entity.setChamadaMembro(dto.getChamadaMembro());
			entity.setChamadaVisitante(dto.getChamadaVisitante());
			MembroDTO AlDTO = dto.getMembro();
			Membro membro = membroRepository.getReferenceById(AlDTO.getId());
			entity.setMembro(membro);
			VisitanteDTO ViDTO = dto.getVisitante();
			Visitante visitante = visitanteRepository.getReferenceById(ViDTO.getId());
			entity.setVisitante(visitante);
			CursoDTO CurDTO = dto.getCurso();
			Curso curso = cursoRepository.getReferenceById(CurDTO.getId());
			entity.setCurso(curso);
	    }
			
}
