package com.esibape.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

<<<<<<< HEAD
import com.esibape.DTO.OpcaoAtendimentoDTO;
import com.esibape.entities.OpcaoAtendimento;
import com.esibape.repository.OpcaoAtendimentoRepository;

=======
import com.esibape.DTO.DescricaoContaDTO;
import com.esibape.DTO.DescricaoReceitaDTO;
import com.esibape.DTO.OpcaoAtendimentoDTO;
import com.esibape.entities.DescricaoConta;
import com.esibape.entities.DescricaoReceita;
import com.esibape.entities.OpcaoAtendimento;
import com.esibape.repository.DescricaoReceitaRepository;
import com.esibape.repository.OpcaoAtendimentoRepository;



>>>>>>> 1bbf3b950d3f4862793f9cbc6fa34d1336e3f09c
@Service
public class OpcaoAtendimentoService {
    @Autowired
    private OpcaoAtendimentoRepository repository;

<<<<<<< HEAD
    
=======
>>>>>>> 1bbf3b950d3f4862793f9cbc6fa34d1336e3f09c
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
<<<<<<< HEAD
    		return new OpcaoAtendimentoDTO(entity);
=======
    		return new OpcaoAtendimentoDTO();
>>>>>>> 1bbf3b950d3f4862793f9cbc6fa34d1336e3f09c
    	
    }
    
	private void copyDtoToEntity(OpcaoAtendimentoDTO dto, OpcaoAtendimento entity) {
	      
        entity.setDescricao(dto.getDescricao());

   
     
	}
	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	    }
    
   
   
}