package com.esibape.service;


import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.EBDCursoDTO;
import com.esibape.DTO.ListaPresencaVisitanteEBDDTO;
import com.esibape.DTO.VisitanteDTO;
import com.esibape.entities.ListaPresencaVisitanteEBD;
import com.esibape.entities.ChamadaVisitante;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.Visitante;
import com.esibape.repository.EBDCursoRepository;
import com.esibape.repository.ListaPresencaVisitanteEBDRepository;
import com.esibape.repository.VisitanteRepository;

@Service
public class ListaPresencaVisitanteEBDService {
	@Autowired
	private ListaPresencaVisitanteEBDRepository repository;
	
	@Autowired
	private VisitanteRepository visitanteRepository;
	
	@Autowired
	private EBDCursoRepository ebdCursoRepository;
	
	@Transactional(readOnly = true)
	public List<ListaPresencaVisitanteEBDDTO> findAll() {
		List <ListaPresencaVisitanteEBD> entity = repository.findAll();
		return  entity.stream()
	               .map(x -> new ListaPresencaVisitanteEBDDTO(x,  x.getVisitante(), x.getEbdCurso()))
	               .collect(Collectors.toList());
	}
	
	 @Transactional(readOnly = true)
	    public ListaPresencaVisitanteEBDDTO findById(Long id) {
	    	Optional<ListaPresencaVisitanteEBD> ListaPresencaVisitanteEBD = repository.findById(id);
	    	ListaPresencaVisitanteEBD entity = ListaPresencaVisitanteEBD.get();
	    	return  new ListaPresencaVisitanteEBDDTO(entity, entity.getVisitante(), entity.getEbdCurso()) ;
	    }
	 @Transactional
	    public ListaPresencaVisitanteEBDDTO insert(ListaPresencaVisitanteEBDDTO dto){
		 ListaPresencaVisitanteEBD entity = new ListaPresencaVisitanteEBD();
		 copyDtoToEntity(dto, entity);
		 entity = repository.save(entity);
	    	return new ListaPresencaVisitanteEBDDTO(entity);
	    	
	    }
	 @Transactional(readOnly = true)
	    public List<ListaPresencaVisitanteEBDDTO> findByMonthAndCurso(YearMonth yearMonth, Long cursoId) {
	        int year = yearMonth.getYear();
	        int month = yearMonth.getMonthValue();
	        List<ListaPresencaVisitanteEBD> entities = repository.findByMonthAndCurso(year, month, cursoId);
	        return entities.stream()
	                       .map(entity -> new ListaPresencaVisitanteEBDDTO(entity, entity.getVisitante(), entity.getEbdCurso()))
	                       .collect(Collectors.toList());
	    }
	 @Transactional(readOnly = true)
	 public List<ChamadaVisitante> findChamadaVisitanteByVisitanteAndMonth(Long visitanteId, YearMonth yearMonth) {
	     int year = yearMonth.getYear();
	     int month = yearMonth.getMonthValue();

	     // Retrieve the chamadas as Strings
	     List<String> chamadas = repository.findChamadaVisitanteByVisitanteAndMonth(visitanteId, year, month);

	     // Convert to ChamadaVisitante using the updated mapping method
	     return chamadas.stream()
	                    .map(ChamadaVisitante::fromValor) // Ensure this method accepts String now
	                    .collect(Collectors.toList());
	 }


	    private void copyDtoToEntity(ListaPresencaVisitanteEBDDTO dto,ListaPresencaVisitanteEBD entity) {
			entity.setData(dto.getData());
			entity.setChamadaVisitante(dto.getChamadaVisitante());
			VisitanteDTO ViDTO = dto.getVisitante();
			Visitante visitante = visitanteRepository.getReferenceById(ViDTO.getId());
			entity.setVisitante(visitante);
			EBDCursoDTO CurDTO = dto.getEbdCurso();
			EBDCurso curso = ebdCursoRepository.getReferenceById(CurDTO.getId());
			entity.setEbdCurso(curso);
	    }
	
			
}
