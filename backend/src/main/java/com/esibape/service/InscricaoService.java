package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.InscricaoDTO;
import com.esibape.entities.Inscricao;
import com.esibape.repository.InscricaoRepository;

@Service
public class InscricaoService {
	
	@Autowired
	private InscricaoRepository repository;
	
	 @Transactional(readOnly = true)
	    public List<InscricaoDTO> findAll() {
	        List<Inscricao> list = repository.findAll(); 
	        return list.stream().map(x ->  new InscricaoDTO(x, x.getCurso(),x.getMembrosEBD())).collect(Collectors.toList());
	   
	    }
	 
	   @Transactional(readOnly = true)
	    public InscricaoDTO findById(Long id) {
	    	Optional<Inscricao> inscricao = repository.findById(id);
	    	Inscricao entity = inscricao.get();
	          return  new InscricaoDTO(entity, entity.getCurso(),entity.getMembrosEBD());
	        
	    }
	    
	    public void delete(Long id) {
	    	repository.deleteById(id);
	 
	   }
	    

}
