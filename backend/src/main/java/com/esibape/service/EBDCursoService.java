package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.CursoDTO;
import com.esibape.DTO.EBDCursoDTO;
import com.esibape.entities.Curso;
import com.esibape.entities.EBDCurso;
import com.esibape.repository.CursoRepository;
import com.esibape.repository.EBDCursoRepository;

@Service
public class EBDCursoService {
	@Autowired
	private EBDCursoRepository repository;

	@Transactional(readOnly = true)
	public List<EBDCursoDTO> findAll() {
	    List<EBDCurso> list = repository.findAll();

	    return list.stream()
	        .map(x -> new EBDCursoDTO(x))
	        .collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public EBDCursoDTO findById(Long id) {
	    Optional<EBDCurso> optionalCurso = repository.findById(id);
	    if (optionalCurso.isPresent()) {
	    	EBDCurso ebdCurso= optionalCurso.get();
	        return new EBDCursoDTO(ebdCurso);
	    } else {
	        // You can return null or throw an exception if you prefer
	        return null;
	    }
	}
		
    
    public void delete(Long id) {
    	repository.deleteById(id);
 
   }

}
