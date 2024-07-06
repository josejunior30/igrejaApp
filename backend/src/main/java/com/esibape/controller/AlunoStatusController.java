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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.esibape.DTO.AlunoStatusDTO;
import com.esibape.service.AlunoStatusService;



@RestController
@RequestMapping(value="/status")
public class AlunoStatusController {
	
@Autowired
private AlunoStatusService service;

@GetMapping
public ResponseEntity <List<AlunoStatusDTO>>findAll(){
	List<AlunoStatusDTO> alunoStatus = service.findAll();
	return ResponseEntity.ok().body(alunoStatus);
}

	@GetMapping(value="/{id}")
	public ResponseEntity<AlunoStatusDTO>findById(@PathVariable Long id){
		AlunoStatusDTO alunoStatus = service.findById(id);
		return ResponseEntity.ok().body(alunoStatus);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<AlunoStatusDTO> insert(@RequestBody AlunoStatusDTO dto){
		AlunoStatusDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<AlunoStatusDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	
}
