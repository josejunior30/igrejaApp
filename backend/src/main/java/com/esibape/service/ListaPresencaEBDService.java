package com.esibape.service;


import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.EBDCursoDTO;
import com.esibape.DTO.ListaPresencaEBDDTO;
import com.esibape.DTO.MembroDTO;
import com.esibape.entities.ListaPresencaEBD;
import com.esibape.entities.Membro;
import com.esibape.entities.EBDCurso;
import com.esibape.repository.EBDCursoRepository;
import com.esibape.repository.ListaPresencaEBDRepository;
import com.esibape.repository.MembroRepository;


@Service
public class ListaPresencaEBDService {
	@Autowired
	private ListaPresencaEBDRepository repository;
	
	@Autowired
	private MembroRepository membroRepository;
	
	@Autowired
	private EBDCursoRepository ebdCursoRepository;
	
	@Transactional(readOnly = true)
	public List<ListaPresencaEBDDTO> findAll() {
		List <ListaPresencaEBD> entity = repository.findAll();
		return  entity.stream()
	               .map(x -> new ListaPresencaEBDDTO(x, x.getMembro(), x.getEbdCurso()))
	               .collect(Collectors.toList());
	}
	
	 @Transactional(readOnly = true)
	    public ListaPresencaEBDDTO findById(Long id) {
	    	Optional<ListaPresencaEBD> ListaPresencaEBD = repository.findById(id);
	    	ListaPresencaEBD entity = ListaPresencaEBD.get();
	    	return  new ListaPresencaEBDDTO(entity, entity.getMembro(),entity.getEbdCurso()) ;
	    }
	 @Transactional
	    public ListaPresencaEBDDTO insert(ListaPresencaEBDDTO dto){
		 ListaPresencaEBD entity = new ListaPresencaEBD();
		 copyDtoToEntity(dto, entity);
		 entity = repository.save(entity);
	    	return new ListaPresencaEBDDTO(entity);
	    	
	    }
	 @Transactional(readOnly = true)
	    public List<ListaPresencaEBDDTO> findByMonthAndCurso(YearMonth yearMonth, Long cursoId) {
	        int year = yearMonth.getYear();
	        int month = yearMonth.getMonthValue();
	        List<ListaPresencaEBD> entities = repository.findByMonthAndCurso(year, month, cursoId);
	        return entities.stream()
	                       .map(entity -> new ListaPresencaEBDDTO(entity, entity.getMembro(), entity.getEbdCurso()))
	                       .collect(Collectors.toList());
	    }

	    private void copyDtoToEntity(ListaPresencaEBDDTO dto,ListaPresencaEBD entity) {
			entity.setData(dto.getData());
			entity.setChamadaMembro(dto.getChamadaMembro());
			MembroDTO AlDTO = dto.getMembro();
			Membro membro = membroRepository.getReferenceById(AlDTO.getId());
			entity.setMembro(membro);
			EBDCursoDTO CurDTO = dto.getEbdCurso();
			EBDCurso curso = ebdCursoRepository.getReferenceById(CurDTO.getId());
			entity.setEbdCurso(curso);
	    }
			
}
