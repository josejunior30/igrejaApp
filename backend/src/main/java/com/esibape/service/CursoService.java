package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.CursoDTO;
import com.esibape.DTO.RelatorioDTO;
import com.esibape.entities.Curso;
import com.esibape.entities.Relatorio;
import com.esibape.repository.CursoRepository;

@Service
public class CursoService {
	@Autowired
	private CursoRepository repository;

	@Transactional(readOnly = true)
	public List<CursoDTO> findAll() {
	    List<Curso> list = repository.findAll();

	    return list.stream()
	        .map(x -> new CursoDTO(x, x.getMembro()))
	        .collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public CursoDTO findById(Long id) {
	    Optional<Curso> optionalCurso = repository.findById(id);
	    if (optionalCurso.isPresent()) {
	        Curso curso = optionalCurso.get();
	        return new CursoDTO(curso, curso.getMembro());
	    } else {
	        // You can return null or throw an exception if you prefer
	        return null;
	    }
	}
		
    
    public void delete(Long id) {
    	repository.deleteById(id);
 
   }

}
