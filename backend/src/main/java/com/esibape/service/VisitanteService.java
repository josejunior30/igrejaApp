package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;

import com.esibape.DTO.VisitanteDTO;
import com.esibape.entities.Curso;
import com.esibape.entities.Membro;
import com.esibape.entities.Visitante;
import com.esibape.repository.CursoRepository;
import com.esibape.repository.VisitanteRepository;



@Service
public class VisitanteService {

	@Autowired
    private VisitanteRepository repository;
	
	   @Autowired
	    private CursoRepository cursoRepository;

	@Transactional(readOnly = true)
	public List<VisitanteDTO> findAll() {
        List<Visitante> list = repository.findAll();
        
        return  list.stream()
	               .map(x -> new VisitanteDTO(x))
	               .collect(Collectors.toList());
    }
	@Transactional(readOnly = true)
    public VisitanteDTO findById(Long id) {
    	Optional<Visitante> membro = repository.findById(id);
    	Visitante entity = membro.get();
    	return  new VisitanteDTO(entity) ;
    }
    @Transactional
    public VisitanteDTO insert( VisitanteDTO dto) {
    		Visitante entity =  new Visitante();
    		copyDtoToEntity(dto, entity);
    		entity = repository.save(entity);
    		return new VisitanteDTO(entity);
    	
    }
    @Transactional
    public VisitanteDTO update(Long id, VisitanteDTO dto) {
    	Visitante entity=repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity);
    	entity = repository.save(entity);
		return new VisitanteDTO(entity);
    }
    
    
    public void delete(Long id) {
    	repository.deleteById(id);
 
    }
    @Transactional
    public void patchUpdateCurso(Long visitanteId, Long cursoId) {
        // Busca o membro pelo ID
        Visitante visitante = repository.findById(visitanteId)
                                  .orElseThrow(() -> new ResourceAccessException("Visitante não encontrado"));

        // Busca o curso pelo ID
        Curso curso = cursoRepository.findById(cursoId)
                                     .orElseThrow(() -> new ResourceAccessException("Curso não encontrado"));

        // Atualiza o curso do visitante
        visitante.setCurso(curso);
        repository.save(visitante);
    }
    private void copyDtoToEntity(VisitanteDTO dto, Visitante entity) {
		entity.setNome(dto.getNome());
	entity.setDataNascimento(dto.getDataNascimento());
	entity.setEmail(dto.getEmail());
	entity.setTelefone(dto.getTelefone());
	entity.setCurso(dto.getCurso());
		entity.setTelefone(dto.getTelefone());
		
	}
    
    @Transactional(readOnly = true)
  	public List<VisitanteDTO> findByNomeIgnoreCaseContaining(String nome) {
  		List<Visitante> result = repository.findByNomeIgnoreCaseContaining(nome);
  		 return  result.stream().map(x -> new VisitanteDTO(x)).toList();
  		
  	}
	
}

