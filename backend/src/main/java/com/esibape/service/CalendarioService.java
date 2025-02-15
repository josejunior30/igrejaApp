package com.esibape.service;


import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.CalendarioDTO;

import com.esibape.entities.Calendario;

import com.esibape.repository.CalendarioRepository;
@Service
public class CalendarioService {

    @Autowired
    private CalendarioRepository repository;

    @Transactional(readOnly = true)
    public List<CalendarioDTO> findAll() {
        List<Calendario> list = repository.findAll();
        return list.stream()
                   .map(CalendarioDTO::new)
                   .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public CalendarioDTO findById(Long id) {
    	Calendario calendario = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Membro não encontrado"));
        
        return new CalendarioDTO(calendario);
    }

    @Transactional
    public CalendarioDTO insert(CalendarioDTO dto) {
    	Calendario entity =  new Calendario();
    	 copyDtoToEntity(dto, entity);	
    		entity = repository.save(entity);
    		return new CalendarioDTO(entity);
    	
    }
    @Transactional
    public CalendarioDTO update(Long id, CalendarioDTO dto) {
    	Calendario entity = repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity);
    	entity = repository.save(entity);
		return new CalendarioDTO(entity);
    }
 
    
    
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Calendario não encontrado");
        }
        repository.deleteById(id);
    }

    
    
    
    
    private void copyDtoToEntity(CalendarioDTO dto, Calendario entity) {
    
        entity.setTitulo(dto.getTitulo());
        entity.setDescricao(dto.getDescricao());
        entity.setResponsavel(dto.getResponsavel());
        entity.setData(dto.getData());
        entity.setHora(dto.getHora());
       
      
    }

  
  
}
