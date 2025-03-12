package com.esibape.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.LiderancaDTO;
import com.esibape.entities.Lideranca;
import com.esibape.repository.LiderancaRepository;


@Service
public class LiderancaService {
    
    @Autowired
    private LiderancaRepository repository;

  
    
    @Transactional(readOnly = true)
    public List<LiderancaDTO> findAll() {
        List<Lideranca> list = repository.findAll();
        return list.stream()
                   .map(LiderancaDTO::new)
                   .collect(Collectors.toList());
    }
 

 
        
}

