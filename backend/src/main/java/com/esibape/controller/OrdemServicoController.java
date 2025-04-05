package com.esibape.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esibape.DTO.MaterialObraDTO;
import com.esibape.DTO.OrdemServicoDTO;
import com.esibape.entities.OrdemServico;
import com.esibape.service.OrdemServicoService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/ordens-servico")
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService service;


    @GetMapping
    public ResponseEntity <List<OrdemServicoDTO>>findAll(){
    	List<OrdemServicoDTO>ordem = service.findAll();
    	return ResponseEntity.ok().body(ordem);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<OrdemServicoDTO> findById(@PathVariable Long id) {
    	OrdemServicoDTO result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }


@PostMapping
public ResponseEntity<OrdemServico> criarOrdemServico(@RequestBody OrdemServico ordemServico) {
    OrdemServico novaOrdemServico = service.criarOrdemServico(ordemServico);
    return ResponseEntity.status(HttpStatus.CREATED).body(novaOrdemServico);
}
}
