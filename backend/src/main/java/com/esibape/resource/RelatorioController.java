package com.esibape.resource;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.ChamadaDTO;
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
	@GetMapping(value="/{id}")
	public ResponseEntity<RelatorioDTO>findById(@PathVariable Long id){
		RelatorioDTO entity = service.findById(id);
		return ResponseEntity.ok().body(entity);
	}
	
	 @GetMapping(value="/dataProjeto")
	    public ResponseEntity<List<RelatorioDTO>> findByDataAndProjetos(
	            @RequestParam(name = "data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
	            @RequestParam(name = "projeto") Long projetoId) {
	        List<RelatorioDTO> relatorios = service.findByDataAndProjeto(data, projetoId);
	        return ResponseEntity.ok().body(relatorios);
	    } 
	 @GetMapping(value="/projeto")
	 public ResponseEntity<List<RelatorioDTO>> findByProjeto(@RequestParam(name ="projeto") Long projetoId) {
	     List<RelatorioDTO> relatorios = service.findByProjeto(projetoId);
	     return ResponseEntity.ok().body(relatorios);
	 }

		@GetMapping(value="/data")
		public ResponseEntity<List<RelatorioDTO>> findAll(@RequestParam(name = "data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
	        List<RelatorioDTO> relatorios = service.findByDate(data);
	        return ResponseEntity.ok().body(relatorios);
	    }
	 
	@PostMapping
	public ResponseEntity<RelatorioDTO>insert(@RequestBody RelatorioDTO dto){
		RelatorioDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<RelatorioDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
