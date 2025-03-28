package com.esibape.service;


import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.AtendimentoDTO;
import com.esibape.entities.Atendimento;
import com.esibape.entities.Membro;
import com.esibape.entities.Visitante;
import com.esibape.repository.AtendimentoRepository;
import com.esibape.repository.MembroRepository;
import com.esibape.repository.VisitanteRepository;


@Service
public class AtendimentoService {
    
    @Autowired
    private AtendimentoRepository repository;

    @Autowired
    private MembroRepository membroRepository;
    
    @Autowired
    private VisitanteRepository visitanteRepository;

    
    @Transactional(readOnly = true)
    public List<AtendimentoDTO> findAll() {
        List<Atendimento> list = repository.findAll();
        
        return list.stream()
                   .map(AtendimentoDTO::new) 
                   .collect(Collectors.toList());
    }

 
    @Transactional(readOnly = true)
    public AtendimentoDTO findById(Long id) {
        Atendimento entity = repository.findById(id)
            .orElseThrow();
        
        return new AtendimentoDTO(entity);
    }

    @Transactional
    public AtendimentoDTO insert( AtendimentoDTO dto) {
    	Atendimento entity =  new Atendimento();
    		copyDtoToEntity(dto, entity);	
    		entity = repository.save(entity);
    		return new AtendimentoDTO(entity);
    	
    }
    
  
    
    public void delete(Long id) {
    	repository.deleteById(id);
    }
    
    private void copyDtoToEntity(AtendimentoDTO dto, Atendimento entity) {
        entity.setData(dto.getData());
        entity.setHorario(dto.getHorario());
        entity.setTipoAtendimento(dto.getTipoAtendimento());
        
        if (dto.getMembroIds() != null && !dto.getMembroIds().isEmpty()) {
            Set<Membro> membros = dto.getMembroIds().stream()
                .map(id -> membroRepository.findById(id)
                    .orElseThrow())
                .collect(Collectors.toSet());
            entity.setMembro(membros);
        }
        if (dto.getVisitanteIds() != null && !dto.getVisitanteIds().isEmpty()) {
            Set<Visitante> visitantes = dto.getVisitanteIds().stream()
                .map(id -> visitanteRepository.findById(id)
                		   .orElseThrow())
                .collect(Collectors.toSet());
            entity.setVisitante(visitantes);
        }
    }
   
    
}

