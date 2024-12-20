package com.esibape.controller;

import java.net.URI;
import java.time.YearMonth;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.ListaPresencaEBDDTO;     
import com.esibape.service.ListaPresencaEBDService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/presenca")
public class ListaPresencaEBDController {
	
	@Autowired
	private ListaPresencaEBDService service;
	@GetMapping
	public ResponseEntity<List<ListaPresencaEBDDTO>>findAll(){
		List<ListaPresencaEBDDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<ListaPresencaEBDDTO>findById(@PathVariable Long id){
		ListaPresencaEBDDTO chamada = service.findById(id);
		return ResponseEntity.ok().body(chamada);
	}
	

	
   @PostMapping
   public ResponseEntity <ListaPresencaEBDDTO> insert(@RequestBody ListaPresencaEBDDTO dto) {
	   ListaPresencaEBDDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
 
		 }
   @GetMapping("/listas-presenca")
   public List<ListaPresencaEBDDTO> getListasPorMesEProjeto(
           @RequestParam("ano") int ano,
           @RequestParam("mes") int mes,
           @RequestParam("cursoId") Long cursoId) {
       YearMonth yearMonth = YearMonth.of(ano, mes);
       return service.findByMonthAndCurso(yearMonth, cursoId);
   }
   

}
