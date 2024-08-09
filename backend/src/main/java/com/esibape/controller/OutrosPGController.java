package com.esibape.controller;

import java.net.URI;
import java.util.Collections;
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

import com.esibape.DTO.OutrosPGDTO;

import com.esibape.entities.MesReferencia;
import com.esibape.service.OutrosPGService;


@RestController
@RequestMapping(value="/entrada")
public class OutrosPGController {
	
	@Autowired
private OutrosPGService service;

@GetMapping
public ResponseEntity <List<OutrosPGDTO>>findAll(){
	List<OutrosPGDTO> outrosPG = service.findAll();
	return ResponseEntity.ok().body(outrosPG);
}

	@GetMapping(value="/{id}")
	public ResponseEntity<OutrosPGDTO>findById(@PathVariable Long id){
		OutrosPGDTO outros = service.findById(id);
		return ResponseEntity.ok().body(outros);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<OutrosPGDTO> insert(@RequestBody OutrosPGDTO dto){
		OutrosPGDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(value="/{id}")
	public ResponseEntity<OutrosPGDTO>update (@PathVariable Long id, @RequestBody OutrosPGDTO dto){
		 dto =service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<OutrosPGDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/mes/{mesReferencia}")
	public ResponseEntity<List<OutrosPGDTO>> getEntradaByMesReferencia(@PathVariable String mesReferencia) {
	    MesReferencia mesReferenciaEnum;
	    try {
	        mesReferenciaEnum = MesReferencia.valueOf(mesReferencia.toUpperCase());
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(Collections.emptyList());
	    }

	    List<OutrosPGDTO> outros = service.findEntradaByMesReferencia(mesReferenciaEnum);
	    return ResponseEntity.ok().body(outros);
	}
   

}
