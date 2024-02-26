package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.esibape.DTO.PequenoGrupoDTO;
import com.esibape.DTO.VisitanteDTO;
import com.esibape.entities.PequenoGrupo;
import com.esibape.entities.Visitante;
import com.esibape.repository.PequenoGrupoRepository;
import com.esibape.repository.VisitanteRepository;



@Service
public class VisitanteService {

	@Autowired
    private VisitanteRepository repository;
	@Autowired
    private PequenoGrupoRepository pequenoGrupoRepository;
    
	@Transactional(readOnly = true)
	public List<VisitanteDTO> findAll() {
        List<Visitante> list = repository.findAll();
        
        return  list.stream()
	               .map(x -> new VisitanteDTO(x, x.getPequenoGrupo()))
	               .collect(Collectors.toList());
    }
	@Transactional(readOnly = true)
    public VisitanteDTO findById(Long id) {
    	Optional<Visitante> membro = repository.findById(id);
    	Visitante entity = membro.get();
    	return  new VisitanteDTO(entity, entity.getPequenoGrupo()) ;
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
    
    private void copyDtoToEntity(VisitanteDTO dto, Visitante entity) {
		entity.setNome(dto.getNome());
		entity.setSobrenome(dto.getSobrenome());
		entity.setSexo(dto.getSexo());
		entity.setTelefone(dto.getTelefone());
		PequenoGrupoDTO pgDTO = dto.getPequenoGrupo();
		PequenoGrupo pequenoGrupo = pequenoGrupoRepository.getReferenceById(pgDTO.getId());
		entity.setPequenoGrupo(pequenoGrupo);
		
		
	}
    
    @Transactional(readOnly = true)
  	public List<VisitanteDTO> findByNomeIgnoreCaseContaining(String nome) {
  		List<Visitante> result = repository.findByNomeIgnoreCaseContaining(nome);
  		 return  result.stream().map(x -> new VisitanteDTO(x)).toList();
  		
  	}
	
}

