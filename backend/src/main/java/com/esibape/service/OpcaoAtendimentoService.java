package com.esibape.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.esibape.DTO.OpcaoAtendimentoDTO;
import com.esibape.entities.OpcaoAtendimento;
import com.esibape.repository.OpcaoAtendimentoRepository;



@Service
public class OpcaoAtendimentoService {
    @Autowired
    private OpcaoAtendimentoRepository repository;

    @Transactional(readOnly = true)
    public List<OpcaoAtendimentoDTO> findAll() {
        List<OpcaoAtendimento> list = repository.findAll();
        
        if (list.isEmpty()) {
            return Collections.emptyList();
        }

        return list.stream()
            .map(OpcaoAtendimentoDTO::new)
            .collect(Collectors.toList());
    }

    
    @Transactional
    public OpcaoAtendimentoDTO insert( OpcaoAtendimentoDTO dto) {
    	OpcaoAtendimento entity =  new OpcaoAtendimento();
    		copyDtoToEntity(dto, entity);	
    		entity = repository.save(entity);
    		return new OpcaoAtendimentoDTO(entity);
    	
    }
    
	private void copyDtoToEntity(OpcaoAtendimentoDTO dto, OpcaoAtendimento entity) {
	      
        entity.setDescricao(dto.getDescricao());

   
     
	}
	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	    }
    
   
   
}
