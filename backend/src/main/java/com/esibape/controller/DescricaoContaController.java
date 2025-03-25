package com.esibape.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esibape.DTO.DescricaoContaDTO;
import com.esibape.service.DescricaoContaService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/descricao-conta")
public class DescricaoContaController {
	
	
	@Autowired
	private DescricaoContaService service;

	
	@GetMapping
	public ResponseEntity <List<DescricaoContaDTO>>findAll(){
		List<DescricaoContaDTO> descricaoConta = service.findAll();
		return ResponseEntity.ok().body(descricaoConta);
	}
	
		
}