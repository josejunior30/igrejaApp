package com.esibape.service;



import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esibape.entities.MaterialObra;
import com.esibape.repository.MaterialObraRepository;

@Service
public class MaterialObraService {

    @Autowired
    private MaterialObraRepository repository;
    @Autowired
    private ServicoService servicoService; 


    @Transactional
    public void atualizarCheckIn(Long id, Boolean checkIn) {
        MaterialObra material = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Material não encontrado"));

        material.setCheckInConfirmado(checkIn != null ? checkIn : false);
        repository.save(material);

        if (material.getServico() != null && material.getServico().getId() != null) {
            servicoService.verificarMateriaisEAtualizarStatus(material.getServico().getId());
        }
    }
}