package com.esibape.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.esibape.DTO.DescricaoReceitaDTO;

import com.esibape.service.DescricaoReceitaService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/descricao-receita")
public class DescricaoReceitaController {
	
	
	@Autowired
	private DescricaoReceitaService service;

	
	@GetMapping
	public ResponseEntity <List<DescricaoReceitaDTO>>findAll(){
		List<DescricaoReceitaDTO> descricaoReceita = service.findAll();
		return ResponseEntity.ok().body(descricaoReceita);
	}
	
		
}