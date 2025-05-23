package com.esibape.controller;



import java.net.URI;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.TransacaoDTO;
import com.esibape.service.TransacaoService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/transacao")
public class TransacaoController {
	
	
	@Autowired
	private TransacaoService service;
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	
	@GetMapping
	public ResponseEntity <List<TransacaoDTO>>findAll(){
		List<TransacaoDTO> transacao = service.findAll();
		return ResponseEntity.ok().body(transacao);
	}
	
		@GetMapping(value="/{id}")
		public ResponseEntity<TransacaoDTO>findById(@PathVariable Long id){
		TransacaoDTO transacao = service.findById(id);
			return ResponseEntity.ok().body(transacao);
		}
	
		@PostMapping
		public ResponseEntity<TransacaoDTO> insert(@RequestBody TransacaoDTO dto){

			TransacaoDTO entity = service.insert(dto);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getId()).toUri();
			
			return ResponseEntity.created(uri).body(entity);
		}		
		  @GetMapping("/ano/{ano}")
		    public ResponseEntity<List<TransacaoDTO>> getTransacoesPorAno(@PathVariable int ano) {
		        return (ano > 0) 
		            ? ResponseEntity.ok(service.buscarPorAno(ano)) 
		            : ResponseEntity.badRequest().body(Collections.emptyList());
		    }
		@DeleteMapping(value="/{id}")
		public ResponseEntity<TransacaoDTO>delete(@PathVariable Long id){
			 service.delete(id);
			return ResponseEntity.noContent().build();
		}
		   @GetMapping("/mes/{mes}/ano/{ano}")
		    public ResponseEntity<List<TransacaoDTO>> getTransacoesPorMesEAno(@PathVariable int mes, @PathVariable int ano) {
		        return (mes >= 1 && mes <= 12 && ano > 0) 
		            ? ResponseEntity.ok(service.buscarPorMesEAno(mes, ano)) 
		            : ResponseEntity.badRequest().body(Collections.emptyList());
		    }

		    @GetMapping("/buscar")
		    public ResponseEntity<List<TransacaoDTO>> buscarPorDescricao(
		            @RequestParam String descricao,
		            @RequestParam(required = false) Integer mes,
		            @RequestParam int ano) {

		        return (!descricao.trim().isEmpty() && ano > 0 && (mes == null || (mes >= 1 && mes <= 12))) 
		            ? ResponseEntity.ok(service.buscarPorDescricao(descricao, mes, ano)) 
		            : ResponseEntity.badRequest().body(Collections.emptyList());
		    }
}