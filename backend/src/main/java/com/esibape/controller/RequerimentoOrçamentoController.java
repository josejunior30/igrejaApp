package com.esibape.controller;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.RequerimentoOrçamentoDTO;
import com.esibape.entities.StatusRequerimento;
import com.esibape.service.RequerimentoOrçamentoService;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/requerimento")
public class RequerimentoOrçamentoController {
	@Autowired
	private RequerimentoOrçamentoService service;

	@GetMapping
	public ResponseEntity <List<RequerimentoOrçamentoDTO>>findAll(){
		List<RequerimentoOrçamentoDTO> RequerimentoOrçamento = service.findAll();
		return ResponseEntity.ok().body(RequerimentoOrçamento);
	}
	
	
	@GetMapping(value="/{id}")
	public ResponseEntity<RequerimentoOrçamentoDTO>findById(@PathVariable Long id){
		RequerimentoOrçamentoDTO RequerimentoOrçamento = service.findById(id);
		return ResponseEntity.ok().body(RequerimentoOrçamento);
	}
	
	@PostMapping
	public ResponseEntity<RequerimentoOrçamentoDTO> insert(@RequestBody RequerimentoOrçamentoDTO dto) {
	    RequerimentoOrçamentoDTO entity = service.insert(dto);

	    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
	            .path("/{id}")
	            .buildAndExpand(entity.getId()) // Certifique-se de que getId() existe no DTO
	            .toUri();

	    return ResponseEntity.created(uri).body(entity);
	}

	
	@PutMapping(value="/{id}")
	public ResponseEntity<RequerimentoOrçamentoDTO>update (@PathVariable Long id, @RequestBody RequerimentoOrçamentoDTO dto){
		 dto =service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}/status")
	public ResponseEntity<RequerimentoOrçamentoDTO> updateStatus(
	        @PathVariable Long id, 
	        @RequestParam StatusRequerimento newStatus) {
	    try {
	        RequerimentoOrçamentoDTO updatedRequerimento = service.updateStatus(id, newStatus);
	        return ResponseEntity.ok().body(updatedRequerimento);
	    } catch (NoSuchElementException e) {
	        return ResponseEntity.notFound().build(); // Retorna 404 se o requerimento não for encontrado
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().build(); // Retorna 400 para outros erros
	    }
	}
	 @GetMapping(value="/mes/{month}/ano/{year}")
	    public ResponseEntity<List<RequerimentoOrçamentoDTO>> getByMonthAndYear(@PathVariable int month, @PathVariable int year) {
	        List<RequerimentoOrçamentoDTO> requerimentos = service.findByMonthAndYear(month, year);
	        return ResponseEntity.ok(requerimentos);
	    }
	}



