package com.esibape.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.ChamadaDTO;
import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;
import com.esibape.repository.ChamadaRepository;

@Service
public class ChamadaService {
	@Autowired
	private ChamadaRepository repository;
	
	@Transactional(readOnly = true)
	public List<ChamadaDTO> findAll() {
		List <Chamada> entity = repository.findAll();
		return  entity.stream()
	               .map(x -> new ChamadaDTO(x, x.getAlunos()))
	               .collect(Collectors.toList());
	}
	
	 @Transactional(readOnly = true)
	    public ChamadaDTO findById(Long id) {
	    	Optional<Chamada> chamada = repository.findById(id);
	    	Chamada entity = chamada.get();
	    	return  new ChamadaDTO(entity, entity.getAlunos()) ;
	    }
	 
	 @Transactional(readOnly = true)
	 public List<ChamadaDTO> findAll(LocalDate data) {
	     List<Chamada> chamadas = repository.findByData(data);
	     
	     List<ChamadaDTO> chamadasDTO = new ArrayList<>();
	     for (Chamada chamada : chamadas) {
	         ChamadaDTO chamadaDTO = new ChamadaDTO(chamada, chamada.getAlunos());
	         chamadasDTO.add(chamadaDTO);
	     }
	     
	     return chamadasDTO;
	 }
}
