package com.esibape.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.esibape.DTO.EstudosDTO;
import com.esibape.service.EstudosService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/estudos")
public class EstudosController {
	
	@Autowired
	private EstudosService service;
	
	
	@GetMapping
	public ResponseEntity<List<EstudosDTO>>findAll(){
		List<EstudosDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<EstudosDTO>findById(@PathVariable Long id){
		EstudosDTO entity = service.findById(id);
		return ResponseEntity.ok().body(entity);

}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<Void>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
