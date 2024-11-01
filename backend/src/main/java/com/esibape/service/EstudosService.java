package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.EstudosDTO;
import com.esibape.entities.Estudos;
import com.esibape.repository.EstudosRepository;

@Service
public class EstudosService {
	@Autowired
	private EstudosRepository repository;

    @Transactional(readOnly = true)
    public List<EstudosDTO> findAll() {
        List<Estudos> list = repository.findAll(); 
        return list.stream()
            .map(x -> {
            	EstudosDTO dto = new EstudosDTO(x);
   
                return dto;
            })
            .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public EstudosDTO findById(Long id) {
    	Optional<Estudos> estudos = repository.findById(id);
    	Estudos entity = estudos.get();
          EstudosDTO dto = new EstudosDTO(entity);
        return dto;
    }
    
    public void delete(Long id) {
    	repository.deleteById(id);
 
   }

}
