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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.esibape.DTO.PagamentoDTO;
import com.esibape.entities.MesReferencia;
import com.esibape.service.PagamentoService;

@RestController
@RequestMapping(value="/pagamento")
public class PagamentoController {
	
	@Autowired
	private PagamentoService service;
	@GetMapping
	public ResponseEntity<List<PagamentoDTO>>findAll(){
		List<PagamentoDTO> pagamento = service.findAll();
		return ResponseEntity.ok().body(pagamento);
	}
	@GetMapping(value="/{id}")
	public ResponseEntity<PagamentoDTO>findById(@PathVariable Long id){
		PagamentoDTO pagamento = service.findById(id);
		return ResponseEntity.ok().body(pagamento);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<PagamentoDTO> insert(@RequestBody PagamentoDTO dto){
		PagamentoDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value="/{id}")
	public ResponseEntity<PagamentoDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	@GetMapping(value = "/mes")
    public ResponseEntity<List<PagamentoDTO>> findPagamentosMesAtual() {
        List<PagamentoDTO> pagamentosMesAtual = service.findPagamentosMesAtual();
        return ResponseEntity.ok().body(pagamentosMesAtual);
    }
	@GetMapping("/mes/{mesReferencia}")
	public ResponseEntity<List<PagamentoDTO>> getPagamentosByMesReferencia(@PathVariable String mesReferencia) {
	    MesReferencia mesReferenciaEnum;
	    try {
	        mesReferenciaEnum = MesReferencia.valueOf(mesReferencia.toUpperCase());
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(Collections.emptyList());
	    }

	    List<PagamentoDTO> pagamentos = service.findPagamentosByMesReferencia(mesReferenciaEnum);
	    return ResponseEntity.ok().body(pagamentos);
	}
	
	@GetMapping("/mes/{mesReferencia}/projeto/{projetoId}")
	public ResponseEntity<List<PagamentoDTO>> getPagamentosByMesReferenciaAndProjeto(
	        @PathVariable String mesReferencia, 
	        @PathVariable Long projetoId) {
	    
	    MesReferencia mesReferenciaEnum;
	    try {
	        mesReferenciaEnum = MesReferencia.valueOf(mesReferencia.toUpperCase());
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(Collections.emptyList());
	    }
	    
	    List<PagamentoDTO> pagamentos = service.findPagamentosByMesReferenciaAndProjetos(mesReferenciaEnum, projetoId);
	    
	    return ResponseEntity.ok().body(pagamentos);
	}

	 @GetMapping("/aluno/{id}")
	    public ResponseEntity<List<PagamentoDTO>> getPagamentosByAluno(@PathVariable Long id) {
	      
	        List<PagamentoDTO> pagamentosDTO = service.getPagamentosByAluno(id);
	        
	        return ResponseEntity.ok(pagamentosDTO);
	    }
}
