package com.esibape.service;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Transactional(readOnly = true)
    public List<AtendimentoDTO> findByYear(int year) {
        List<Atendimento> atendimentos = repository.findByYear(year);
        return atendimentos.stream()
                           .map(AtendimentoDTO::new)
                           .collect(Collectors.toList());
    }
  
    
    public void delete(Long id) {
    	repository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public List<AtendimentoDTO> findProximosAtendimentos() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Atendimento> list = repository.findProximosAtendimentos(pageable);
        return list.stream().map(AtendimentoDTO::new).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AtendimentoDTO> findUltimosAtendimentos() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Atendimento> list = repository.findUltimosAtendimentos(pageable);
        return list.stream().map(AtendimentoDTO::new).collect(Collectors.toList());
    }
    private void copyDtoToEntity(AtendimentoDTO dto, Atendimento entity) {
        entity.setData(dto.getData());
        entity.setHorario(dto.getHorario());
        entity.setTipoAtendimento(dto.getTipoAtendimento());

        if (dto.getMembroIds() != null && !dto.getMembroIds().isEmpty()) {
            Set<Membro> membros = dto.getMembroIds().stream()
                .map(id -> membroRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Membro não encontrado: " + id)))
                .collect(Collectors.toSet());

            entity.getMembro().clear();
            entity.getMembro().addAll(membros);
        }

        if (dto.getVisitanteIds() != null && !dto.getVisitanteIds().isEmpty()) {
            Set<Visitante> visitantes = dto.getVisitanteIds().stream()
                .map(id -> visitanteRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado: " + id)))
                .collect(Collectors.toSet());

            entity.getVisitante().clear();
            entity.getVisitante().addAll(visitantes);
        }
    }

    @Transactional(readOnly = true)
    public List<AtendimentoDTO> findByMesEAno(int mes, int ano) {
        List<Atendimento> list = repository.findByMesEAno(mes, ano);
        return list.stream().map(AtendimentoDTO::new).collect(Collectors.toList());
    }
    
}

