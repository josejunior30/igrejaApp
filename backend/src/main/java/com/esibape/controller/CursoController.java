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

import com.esibape.DTO.ChamadaDTO;
import com.esibape.DTO.CursoDTO;

import com.esibape.service.CursoService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/curso")
public class CursoController {
	
	@Autowired
	private CursoService service;
	
	
	@GetMapping
	public ResponseEntity<List<CursoDTO>>findAll(){
		List<CursoDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<CursoDTO> findById(@PathVariable Long id) {
        CursoDTO result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }

	
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<Void>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
