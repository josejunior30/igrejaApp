package com.esibape.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.PequenoGrupoDTO;
import com.esibape.entities.PequenoGrupo;
import com.esibape.repository.PequenoGrupoRepository;


@Service
public class PequenoGrupoService {
	
	@Autowired
	private PequenoGrupoRepository repository;
	

	@Transactional(readOnly = true)
	public List<PequenoGrupoDTO>findAll(){
		List<PequenoGrupo>list= repository.findAll();
		return  list.stream()
	               .map(x -> new PequenoGrupoDTO(x, x.getMembros(), x.getVisitantes()))
	               .collect(Collectors.toList());
}
	@Transactional(readOnly = true)
		public PequenoGrupoDTO findById( Long id) {
			Optional<PequenoGrupo> pequenoGrupo= repository.findById(id);
			PequenoGrupo entity = pequenoGrupo.get();
			return new PequenoGrupoDTO(entity, entity.getMembros(), entity.getVisitantes());
			
		}
	
		@Transactional
        public PequenoGrupoDTO insert( PequenoGrupoDTO dto) {
        	PequenoGrupo entity = new PequenoGrupo();	
  	        copyDtoToEntity(dto, entity);
  	       entity.setVisitantes(dto.getVisitantes());
  	        entity = repository.save(entity);
  	        return new PequenoGrupoDTO(entity);
		}
        
		@Transactional
		public PequenoGrupoDTO update(Long id, PequenoGrupoDTO dto) {
			PequenoGrupo entity = repository.getReferenceById(id);
			copyDtoToEntity(dto, entity);
			repository.save(entity);
			return new PequenoGrupoDTO(entity);
		}
		   public void delete(Long id) {
		    	repository.deleteById(id);
		 
		    }
                
        private void copyDtoToEntity(PequenoGrupoDTO dto, PequenoGrupo entity) {
    		entity.setNome(dto.getNome());
    		entity.setApelido(dto.getApelido());
    		entity.setLider(dto.getLider());
    		
    		
    	}

    }

  

