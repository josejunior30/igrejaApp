package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.ProjetosDTO;
import com.esibape.entities.Alunos;
import com.esibape.entities.Projetos;
import com.esibape.repository.AlunosRepository;
import com.esibape.repository.ProjetosRepository;

@Service
public class AlunosService {
	@Autowired
	private AlunosRepository repository;
	@Autowired
	private ProjetosRepository projetosRepository;
	 @Transactional(readOnly = true)
	    public List<AlunosDTO> findAll() {
	        List<Alunos> list = repository.findAll();
	        
	        return  list.stream()
		               .map(x -> new AlunosDTO(x, x.getProjetos()))
		               .collect(Collectors.toList());
	    }
	  @Transactional(readOnly = true)
	    public AlunosDTO findById(Long id) {
	    	Optional<Alunos> alunos = repository.findById(id);
	    	Alunos entity = alunos.get();
	    	return  new AlunosDTO(entity, entity.getProjetos()) ;
	    }
	  
	  @Transactional
	    public AlunosDTO insert( AlunosDTO dto) {
	    		Alunos entity =  new Alunos();
	    		copyDtoToEntity(dto, entity);
	    		entity = repository.save(entity);
	    		return new AlunosDTO(entity);
	    	
	    }
	  
	    @Transactional
	    public AlunosDTO update(Long id, AlunosDTO dto) {
	    	Alunos entity=repository.getReferenceById(id);
	    	copyDtoToEntity(dto, entity);
	    	entity = repository.save(entity);
			return new AlunosDTO(entity);
	    }
	    
	    public void delete(Long id) {
	    	repository.deleteById(id);
	 
	    }
	  
	  
	  
	   private void copyDtoToEntity(AlunosDTO dto, Alunos entity) {
			entity.setNome(dto.getNome());
			entity.setDataNascimento(dto.getDataNascimento());
			entity.setIdade(dto.getIdade());
			entity.setResponsavel(dto.getResponsavel());
			entity.setRg(dto.getRg());
			entity.setCpfResponsavel(dto.getCpfResponsavel());
			ProjetosDTO pgDTO = dto.getProjetos();
			Projetos projetos = projetosRepository.getReferenceById(pgDTO.getId());
			entity.setProjetos(projetos);
			
		}	
}
