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

import com.esibape.DTO.OpcaoAtendimentoDTO;
import com.esibape.service.OpcaoAtendimentoService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/opcao-atendimento")
public class OpcaoAtendimentoController {
	
	
	@Autowired
	private OpcaoAtendimentoService service;

	
	@GetMapping
	public ResponseEntity <List<OpcaoAtendimentoDTO>>findAll(){
		List<OpcaoAtendimentoDTO> opcaoAtendimento = service.findAll();
		return ResponseEntity.ok().body(opcaoAtendimento);
	}
	
	   @PostMapping
		public ResponseEntity<OpcaoAtendimentoDTO> insert(@RequestBody OpcaoAtendimentoDTO dto){
		   OpcaoAtendimentoDTO entity = service.insert(dto);
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