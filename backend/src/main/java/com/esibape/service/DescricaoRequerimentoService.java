package com.esibape.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.DescricaoRequerimentoDTO;
import com.esibape.entities.DescricaoRequerimento;
import com.esibape.repository.DescricaoRequerimentoRepository;


@Service
public class DescricaoRequerimentoService {
    @Autowired
    private DescricaoRequerimentoRepository repository;



    @Transactional(readOnly = true)
    public List<DescricaoRequerimentoDTO> findAll() {
        List<DescricaoRequerimento> list = repository.findAll();
        
        if (list.isEmpty()) {
            return Collections.emptyList();
        }

        return list.stream()
            .map(DescricaoRequerimentoDTO::new)
            .collect(Collectors.toList());
    }
}