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
import com.esibape.DTO.ProdutoDTO;
import com.esibape.service.ProdutoService;

@RestController
@RequestMapping(value="/produto")
public class ProdutoController {
	@Autowired
	private ProdutoService service;
	

	@GetMapping
	public ResponseEntity <List<ProdutoDTO>>findAll(){
		List<ProdutoDTO> produto = service.findAll();
		return ResponseEntity.ok().body(produto);
	}

	@GetMapping(value="/{id}")
	public ResponseEntity<ProdutoDTO>findById(@PathVariable Long id){
		ProdutoDTO produto = service.findById(id);
		return ResponseEntity.ok().body(produto);
	}
	
	@PostMapping
	public ResponseEntity<ProdutoDTO> insert(@RequestBody ProdutoDTO dto){
		ProdutoDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}

	@PutMapping(value="/{id}")
	public ResponseEntity<ProdutoDTO>update (@PathVariable Long id, @RequestBody ProdutoDTO dto){
		 dto =service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value="/{id}")
	public ResponseEntity<ProdutoDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
