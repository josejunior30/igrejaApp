
package com.esibape.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.esibape.DTO.LiderancaDTO;
import com.esibape.service.LiderancaService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/lideranca")
public class LiderancaController {
	
	@Autowired
	private LiderancaService service;
	
	
	@GetMapping
	public ResponseEntity<List<LiderancaDTO>>findAll(){
		List<LiderancaDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
   
}
