package com.esibape.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.esibape.DTO.DescricaoRequerimentoDTO;
import com.esibape.service.DescricaoRequerimentoService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/descricao-requerimento")
public class DescricaoRequerimentoController {
	
	
	@Autowired
	private DescricaoRequerimentoService service;

	
	@GetMapping
	public ResponseEntity <List<DescricaoRequerimentoDTO>>findAll(){
		List<DescricaoRequerimentoDTO> descricaoRequerimento = service.findAll();
		return ResponseEntity.ok().body(descricaoRequerimento);
	}
	
		
}