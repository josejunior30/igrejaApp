package com.esibape.service;


import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.esibape.DTO.QuantidadePorCultoDTO;
import com.esibape.entities.QuantidadePorCulto;
import com.esibape.repository.QuantidadePorCultoRepository;

@Service
public class QuantidadePorCultoService {
    @Autowired
    private QuantidadePorCultoRepository repository;
    
    
    @Transactional(readOnly = true)
    public List<QuantidadePorCultoDTO> findAll() {
        List<QuantidadePorCulto> list = repository.findAll();
        
        return  list.stream()
	               .map(x -> new QuantidadePorCultoDTO(x))
	               .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public QuantidadePorCultoDTO findById(Long id) {
    	Optional<QuantidadePorCulto> quantidadePorCulto = repository.findById(id);
    	QuantidadePorCulto entity = quantidadePorCulto.get();
    	return  new QuantidadePorCultoDTO(entity);
    }
    
    
    @Transactional
    public QuantidadePorCultoDTO insert( QuantidadePorCultoDTO dto) {
    	QuantidadePorCulto entity =  new QuantidadePorCulto();
    		copyDtoToEntity(dto, entity);
    		
    		entity = repository.save(entity);
    		return new QuantidadePorCultoDTO(entity);
    	
    }

    @Transactional
    public QuantidadePorCultoDTO update(Long id, QuantidadePorCultoDTO dto) {
    	QuantidadePorCulto entity=repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity);
    	entity = repository.save(entity);
		return new QuantidadePorCultoDTO(entity);
    }

    public void delete(Long id) {
    	repository.deleteById(id);
 
    }
    @Transactional(readOnly = true)
    public List<QuantidadePorCultoDTO> findByMes(int mes) {
        List<QuantidadePorCulto> list = repository.findByMes(mes);
        
        return list.stream()
                .map(x -> new QuantidadePorCultoDTO(x))
                .collect(Collectors.toList());
    }
    
    private void copyDtoToEntity(QuantidadePorCultoDTO dto, QuantidadePorCulto entity) {
   
        entity.setVisitante(dto.getVisitante());
        entity.setMembro(dto.getMembro());
        entity.setTotal(dto.getTotal());
        entity.setData(dto.getData());
        entity.setTipoCulto(dto.getTipoCulto());
     entity.setResumo(dto.getResumo());
    }
}




