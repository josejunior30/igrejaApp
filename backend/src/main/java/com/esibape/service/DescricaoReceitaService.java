package com.esibape.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.DescricaoReceitaDTO;
import com.esibape.entities.DescricaoReceita;
import com.esibape.repository.DescricaoReceitaRepository;



@Service
public class DescricaoReceitaService {
    @Autowired
    private DescricaoReceitaRepository repository;


    @Transactional(readOnly = true)
    public List<DescricaoReceitaDTO> findAll() {
        List<DescricaoReceita> list = repository.findAll();
        
        if (list.isEmpty()) {
            return Collections.emptyList();
        }

        return list.stream()
            .map(DescricaoReceitaDTO::new)
            .collect(Collectors.toList());
    }
    @Transactional
    public DescricaoReceitaDTO insert( DescricaoReceitaDTO dto) {
    	DescricaoReceita entity =  new DescricaoReceita();
    		copyDtoToEntity(dto, entity);	
    		entity = repository.save(entity);
    		return new DescricaoReceitaDTO(entity);
    	
    }
    
	private void copyDtoToEntity(DescricaoReceitaDTO dto, DescricaoReceita entity) {
	      
        entity.setDescricao(dto.getDescricao());

   
     
	}
	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	    }
    
   
   
}