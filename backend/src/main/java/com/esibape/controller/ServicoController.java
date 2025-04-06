package com.esibape.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esibape.entities.StatusServico;
import com.esibape.service.ServicoService;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatusServico(
            @PathVariable Long id,
            @RequestBody StatusServico novoStatus) {

        servicoService.atualizarStatusServico(id, novoStatus);
        return ResponseEntity.noContent().build(); 
    }


}