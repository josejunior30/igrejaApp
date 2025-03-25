package com.esibape.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.DescricaoContaDTO;
import com.esibape.entities.DescricaoConta;
import com.esibape.repository.DescricaoContaRepository;



@Service
public class DescricaoContaService {
    @Autowired
    private DescricaoContaRepository repository;


    @Transactional(readOnly = true)
    public List<DescricaoContaDTO> findAll() {
        List<DescricaoConta> list = repository.findAll();
        
        if (list.isEmpty()) {
            return Collections.emptyList();
        }

        return list.stream()
            .map(DescricaoContaDTO::new)
            .collect(Collectors.toList());
    }

   
}