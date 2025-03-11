package com.esibape.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.ContaPagarDTO;
import com.esibape.DTO.VisitanteDTO;
import com.esibape.entities.StatusPagamento;
import com.esibape.service.ContaPagarService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/contaPagar")
public class ContaPagarController {
	
		@Autowired
		private ContaPagarService service;
	

		@GetMapping
		public ResponseEntity <List<ContaPagarDTO>>findAll(){
			List<ContaPagarDTO> contaPagar = service.findAll();
			return ResponseEntity.ok().body(contaPagar);
		}
		
			@GetMapping(value="/{id}")
			public ResponseEntity<ContaPagarDTO>findById(@PathVariable Long id){
				ContaPagarDTO contaPagar = service.findById(id);
				return ResponseEntity.ok().body(contaPagar);
			}
		
		
			@PreAuthorize("hasRole('ROLE_FINANCA')")
		    @PostMapping
		    public ResponseEntity<ContaPagarDTO> insert(@RequestBody ContaPagarDTO dto) {
		        ContaPagarDTO entity = service.insert(dto);
		        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		                .path("/{id}")
		                .buildAndExpand(entity.getId())
		                .toUri();
		        return ResponseEntity.created(uri).body(entity);
		    }
			
		    @PatchMapping("/{id}/status")
		    public ResponseEntity<ContaPagarDTO> updateStatus(@PathVariable Long id, @RequestBody StatusPagamento novoStatus) {
		        ContaPagarDTO dto = service.updateStatus(id, novoStatus);
		        return ResponseEntity.ok(dto);
		    }
			@DeleteMapping(value="/{id}")
			public ResponseEntity<VisitanteDTO>delete(@PathVariable Long id){
				 service.delete(id);
				return ResponseEntity.noContent().build();
			}
			
			// 🔹 Buscar contas pagas filtrando por descrição, mês e ano
		    @GetMapping("/buscar-por-data")
		    public ResponseEntity<List<ContaPagarDTO>> buscarPorDescricaoStatusMesAno(
		        @RequestParam String descricao, 
		        @RequestParam(required = true) Integer mes, 
		        @RequestParam(required = true) Integer ano
		    ) {
		        if (mes == null || ano == null) {
		            return ResponseEntity.badRequest().body(null);
		        }
		        
		        List<ContaPagarDTO> contas = service.findByDescricaoStatusMesAno(descricao, mes, ano);
		        return ResponseEntity.ok(contas);
		    }
		    
		    @GetMapping("/buscar-por-ano")
		    public ResponseEntity<List<ContaPagarDTO>> buscarPorDescricaoAno(
		        @RequestParam String descricao,
		        @RequestParam Integer ano
		    ) {
		        if (ano == null) {
		            return ResponseEntity.badRequest().body(null);
		        }

		        List<ContaPagarDTO> contas = service.findByDescricaoAndAno(descricao, ano);
		        return ResponseEntity.ok(contas);
		    }
		    
		    @GetMapping("/buscar-por-data-criacao")
		    public ResponseEntity<List<ContaPagarDTO>> buscarPorMesAnoDataCriacao(
		        @RequestParam Integer mes, 
		        @RequestParam Integer ano
		    ) {
		        if (mes == null || ano == null) {
		            return ResponseEntity.badRequest().body(null);
		        }

		        List<ContaPagarDTO> contas = service.findByMesAnoDataCriacao(mes, ano);
		        return ResponseEntity.ok(contas);
		    }
			
}