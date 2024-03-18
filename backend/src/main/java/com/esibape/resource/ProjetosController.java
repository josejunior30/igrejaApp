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
import com.esibape.DTO.ProjetosDTO;
import com.esibape.service.ProjetosService;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/projetos")
public class ProjetosController {
	
	@Autowired
	private ProjetosService service;
	
	
	@GetMapping
	public ResponseEntity<List<ProjetosDTO>>findAll(){
		List<ProjetosDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<ProjetosDTO>findById(@PathVariable Long id){
		ProjetosDTO entity = service.findById(id);
		return ResponseEntity.ok().body(entity);

}
	@PostMapping
	public ResponseEntity<ProjetosDTO> insert(@RequestBody ProjetosDTO dto){
		ProjetosDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	@PutMapping(value="/{id}")
	public ResponseEntity<ProjetosDTO> update( @PathVariable Long id,  @RequestBody ProjetosDTO dto){
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<Void>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
