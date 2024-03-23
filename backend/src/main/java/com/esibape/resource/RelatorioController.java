package com.esibape.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.esibape.DTO.RelatorioDTO;
import com.esibape.service.RelatorioService;

@RestController
@RequestMapping(value="/relatorio")
public class RelatorioController {
	@Autowired
	private RelatorioService service;
	
	@GetMapping
	public ResponseEntity<List<RelatorioDTO>>findAll(){
		List<RelatorioDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
}
