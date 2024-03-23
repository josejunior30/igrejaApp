package com.esibape.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.ChamadaDTO;
import com.esibape.DTO.RelatorioDTO;
import com.esibape.entities.Chamada;
import com.esibape.entities.Relatorio;
import com.esibape.repository.RelatorioRepository;

@Service	
public class RelatorioService {
	@Autowired
	private RelatorioRepository repository;

	
	@Transactional(readOnly = true)
    public List<RelatorioDTO> findAll() {
        List<Relatorio> entity = repository.findAll();
        return entity.stream()
                     .map(x -> new RelatorioDTO(x, x.getProjetosRelatorio()))
                     .collect(Collectors.toList());
    
}
	
}