package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.AlunoStatusDTO;
import com.esibape.entities.AlunoStatus;
import com.esibape.repository.AlunoStatusRepository;
import com.esibape.repository.AlunosRepository;


@Service
public class AlunoStatusService {

	@Autowired
	private AlunoStatusRepository repository;
	
	
	@Transactional(readOnly = true)
	    public List<AlunoStatusDTO> findAll() {
	        List<AlunoStatus> list = repository.findAll();
	        
	        return  list.stream()
		               .map(x -> new AlunoStatusDTO(x,  x.getAlunos() ))
		               .collect(Collectors.toList());
	    }
	  @Transactional(readOnly = true)
	    public AlunoStatusDTO findById(Long id) {
	    	Optional<AlunoStatus> alunoStatus = repository.findById(id);
	    	AlunoStatus entity = alunoStatus.get();
	    	return  new AlunoStatusDTO(entity, entity.getAlunos()) ;
	    }
	  
	  @Transactional
	    public AlunoStatusDTO insert( AlunoStatusDTO dto) {
	    		AlunoStatus entity =  new AlunoStatus();
	    		copyDtoToEntity(dto, entity);
	    		
	    		entity = repository.save(entity);
	    		return new AlunoStatusDTO(entity);
	    	
	    }

	    
	    public void delete(Long id) {
	    	repository.deleteById(id);
	 
	    } 
	    
	 
	  
	   private void copyDtoToEntity(AlunoStatusDTO dto, AlunoStatus entity) {
		  
			entity.setPendencia(dto.getPendencia());
		
		

			
		
		
	
			
		}	
	 
}
