package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.CursoDTO;
import com.esibape.entities.Curso;
import com.esibape.repository.CursoRepository;

@Service
public class CursoService {
	@Autowired
	private CursoRepository repository;

    @Transactional(readOnly = true)
    public List<CursoDTO> findAll() {
        List<Curso> list = repository.findAll(); 
        return list.stream()
            .map(x ->  new CursoDTO(x, x.getEstudos(),x.getInscricoes()))
            .collect(Collectors.toList());
    }
 
    
    @Transactional(readOnly = true)
    public CursoDTO findById(Long id) {
    	Optional<Curso> curso = repository.findById(id);
          Curso entity = curso.get();
     			CursoDTO dto = new CursoDTO(entity);
        return dto;
    }
    
    public void delete(Long id) {
    	repository.deleteById(id);
 
   }

}
