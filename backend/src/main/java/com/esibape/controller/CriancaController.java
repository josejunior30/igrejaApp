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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.esibape.DTO.CriancaDTO;
import com.esibape.service.CriancaService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/kids")
public class CriancaController {
	
	
	@Autowired
	private CriancaService service;
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	
	@GetMapping
	public ResponseEntity <List<CriancaDTO>>findAll(){
		List<CriancaDTO> crianca = service.findAll();
		return ResponseEntity.ok().body(crianca);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
		@GetMapping(value="/{id}")
		public ResponseEntity<CriancaDTO>findById(@PathVariable Long id){
		CriancaDTO crianca = service.findById(id);
			return ResponseEntity.ok().body(crianca);
		}
	
		@PostMapping
		public ResponseEntity<CriancaDTO> insert(@RequestBody CriancaDTO dto){

			CriancaDTO entity = service.insert(dto);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getId()).toUri();
			
			return ResponseEntity.created(uri).body(entity);
		}		
		

		@PutMapping(value="/{id}")
		public ResponseEntity<CriancaDTO>update (@PathVariable Long id, @RequestBody CriancaDTO dto){
			 dto =service.update(id, dto);
			return ResponseEntity.ok().body(dto);
		}
		
		@DeleteMapping(value="/{id}")
		public ResponseEntity<CriancaDTO>delete(@PathVariable Long id){
			 service.delete(id);
			return ResponseEntity.noContent().build();
		}
		
}