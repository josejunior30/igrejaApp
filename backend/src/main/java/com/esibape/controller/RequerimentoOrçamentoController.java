package com.esibape.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.RequerimentoOrçamentoDTO;
import com.esibape.service.RequerimentoOrçamentoService;

@RestController
@RequestMapping(value = "/requerimento")
public class RequerimentoOrçamentoController {
	@Autowired
	private RequerimentoOrçamentoService service;

	@GetMapping
	public ResponseEntity <List<RequerimentoOrçamentoDTO>>findAll(){
		List<RequerimentoOrçamentoDTO> RequerimentoOrçamento = service.findAll();
		return ResponseEntity.ok().body(RequerimentoOrçamento);
	}
	
	
	@GetMapping(value="/{id}")
	public ResponseEntity<RequerimentoOrçamentoDTO>findById(@PathVariable Long id){
		RequerimentoOrçamentoDTO RequerimentoOrçamento = service.findById(id);
		return ResponseEntity.ok().body(RequerimentoOrçamento);
	}
	
	@PostMapping
	public ResponseEntity<RequerimentoOrçamentoDTO> insert(@RequestBody RequerimentoOrçamentoDTO dto){
		RequerimentoOrçamentoDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}

	
	@PutMapping(value="/{id}")
	public ResponseEntity<RequerimentoOrçamentoDTO>update (@PathVariable Long id, @RequestBody RequerimentoOrçamentoDTO dto){
		 dto =service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
