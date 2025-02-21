package com.esibape.controller;



import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.esibape.DTO.TransacaoDTO;
import com.esibape.service.TransacaoService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/transacao")
public class TransacaoController {
	
	
	@Autowired
	private TransacaoService service;
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	
	@GetMapping
	public ResponseEntity <List<TransacaoDTO>>findAll(){
		List<TransacaoDTO> transacao = service.findAll();
		return ResponseEntity.ok().body(transacao);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
		@GetMapping(value="/{id}")
		public ResponseEntity<TransacaoDTO>findById(@PathVariable Long id){
		TransacaoDTO transacao = service.findById(id);
			return ResponseEntity.ok().body(transacao);
		}
	
		@PostMapping
		public ResponseEntity<TransacaoDTO> insert(@RequestBody TransacaoDTO dto){

			TransacaoDTO entity = service.insert(dto);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getId()).toUri();
			
			return ResponseEntity.created(uri).body(entity);
		}		
		
		@DeleteMapping(value="/{id}")
		public ResponseEntity<TransacaoDTO>delete(@PathVariable Long id){
			 service.delete(id);
			return ResponseEntity.noContent().build();
		}
		
}