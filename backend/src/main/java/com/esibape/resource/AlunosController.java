package com.esibape.resource;

import java.net.URI;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.esibape.service.AlunosService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/alunos")
public class AlunosController {
	@Autowired
private AlunosService service;

@GetMapping
public ResponseEntity <List<AlunosDTO>>findAll(){
	List<AlunosDTO> alunos = service.findAll();
	return ResponseEntity.ok().body(alunos);
}

	@GetMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>findById(@PathVariable Long id){
		AlunosDTO alunos = service.findById(id);
		return ResponseEntity.ok().body(alunos);
	}
   
	@PostMapping
	public ResponseEntity<AlunosDTO> insert(@RequestBody AlunosDTO dto){
		AlunosDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	
	@PutMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>update (@PathVariable Long id, @RequestBody AlunosDTO dto){
		 dto =service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
