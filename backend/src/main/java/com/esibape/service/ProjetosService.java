package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.ProjetosDTO;
import com.esibape.entities.Projetos;
import com.esibape.repository.ProjetosRepository;



@Service
public class ProjetosService {
	@Autowired
	private ProjetosRepository repository;
	
	
	@Transactional(readOnly = true)
	public List<ProjetosDTO> findAll() {
		List <Projetos> entity = repository.findAll();
		return  entity.stream()
	               .map(x -> new ProjetosDTO(x, x.getAlunos()))
	               .collect(Collectors.toList());
	}
	@Transactional(readOnly = true)
    public ProjetosDTO findById(Long id) {
    	Optional<Projetos> projetos = repository.findById(id);
    	Projetos entity = projetos.get();
    	return  new ProjetosDTO(entity, entity.getAlunos()) ;
    }
	
	@Transactional
    public ProjetosDTO insert( ProjetosDTO dto) {
    	Projetos entity = new Projetos();	
	        copyDtoToEntity(dto, entity);
	        entity = repository.save(entity);
	        return new ProjetosDTO(entity);
	}
    
	@Transactional
	public ProjetosDTO update(Long id, ProjetosDTO dto) {
		Projetos entity = repository.getReferenceById(id);
		copyDtoToEntity(dto, entity);
		repository.save(entity);
		return new ProjetosDTO(entity);
	}
	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	 
	   }
	   
	private void copyDtoToEntity(ProjetosDTO dto, Projetos entity) {
		entity.setNome(dto.getNome());
		entity.setLider(dto.getLider());
		
	}

	
}
