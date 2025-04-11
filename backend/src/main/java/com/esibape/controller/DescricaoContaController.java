package com.esibape.controller;


import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
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
	
	   @PostMapping
		public ResponseEntity<DescricaoContaDTO> insert(@RequestBody DescricaoContaDTO dto){
		   DescricaoContaDTO entity = service.insert(dto);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getId()).toUri();
			return ResponseEntity.created(uri).body(entity);
		}
	   
		@DeleteMapping(value="/{id}")
		public ResponseEntity<Void>delete(@PathVariable Long id){
			 service.delete(id);
			return ResponseEntity.noContent().build();
		}
	
		
}