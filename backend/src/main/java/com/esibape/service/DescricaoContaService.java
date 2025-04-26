package com.esibape.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.DescricaoContaDTO;
import com.esibape.entities.DescricaoConta;
import com.esibape.repository.DescricaoContaRepository;



@Service
public class DescricaoContaService {
    @Autowired
    private DescricaoContaRepository repository;


    @Transactional(readOnly = true)
    public List<DescricaoContaDTO> findAll() {
        List<DescricaoConta> list = repository.findAll();
        
        if (list.isEmpty()) {
            return Collections.emptyList();
        }

        return list.stream()
            .map(DescricaoContaDTO::new)
            .collect(Collectors.toList());
    }

    @Transactional
    public DescricaoContaDTO insert( DescricaoContaDTO dto) {
    	DescricaoConta entity =  new DescricaoConta();
    		copyDtoToEntity(dto, entity);	
    		entity = repository.save(entity);
    		return new DescricaoContaDTO(entity);
    	
    }
    
	private void copyDtoToEntity(DescricaoContaDTO dto, DescricaoConta entity) {
	      
        entity.setDescricao(dto.getDescricao());

   
     
	}
	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	    }
    
   
}