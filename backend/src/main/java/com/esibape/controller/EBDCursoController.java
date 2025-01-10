
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
import com.esibape.DTO.EBDCursoDTO;

import com.esibape.service.EBDCursoService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/curso-trilho")
public class EBDCursoController {
	
	@Autowired
	private EBDCursoService service;
	
	
	@GetMapping
	public ResponseEntity<List<EBDCursoDTO>>findAll(){
		List<EBDCursoDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<EBDCursoDTO> findById(@PathVariable Long id) {
        EBDCursoDTO result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }

	
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<Void>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
