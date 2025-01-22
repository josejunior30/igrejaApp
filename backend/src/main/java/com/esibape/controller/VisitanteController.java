package com.esibape.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.VisitanteDTO;
import com.esibape.service.VisitanteService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/visitante")
public class VisitanteController {
	
		@Autowired
		private VisitanteService service;
	

		@GetMapping
		public ResponseEntity <List<VisitanteDTO>>findAll(){
			List<VisitanteDTO> visitante = service.findAll();
			return ResponseEntity.ok().body(visitante);
		}
		
			@GetMapping(value="/{id}")
			public ResponseEntity<VisitanteDTO>findById(@PathVariable Long id){
				VisitanteDTO visitante = service.findById(id);
				return ResponseEntity.ok().body(visitante);
			}
		
		    @PostMapping("/com-curso/{cursoId}")
		    public ResponseEntity<VisitanteDTO> insertWithCurso(@Valid @RequestBody VisitanteDTO dto, @PathVariable Long cursoId) {
		        VisitanteDTO newDto = service.insertWithEbdCurso(dto, cursoId);
		        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		                                             .path("/{id}")
		                                             .buildAndExpand(newDto.getId())
		                                             .toUri();
		        return ResponseEntity.created(uri).body(newDto);
		    }
		    
		    @PostMapping("/{visitanteId}/curso/{cursoId}")
		    public ResponseEntity<VisitanteDTO> addEbdCurso(@PathVariable Long visitanteId, @PathVariable Long cursoId) {
		        VisitanteDTO dto = service.addEbdCursoToVisitante(visitanteId, cursoId);
		        return ResponseEntity.ok().body(dto);
		    }
		    
		    @PatchMapping(value = "/{id}/opcao-curso")
		    public ResponseEntity<Void> patchUpdateOpcao(@PathVariable Long id, @RequestBody String opcaoCurso) {
		        service.patchUpdateOpcao(id, opcaoCurso);
		        return ResponseEntity.noContent().build();
		    }
		    @PatchMapping(value = "/{id}/opcao-apostila")
		    public ResponseEntity<Void> patchUpdateApostila(
		            @PathVariable Long id, 
		            @RequestBody Map<String, Boolean> body) {

		        // Extrai o valor de 'apostila' do corpo da requisição
		        Boolean apostila = body.get("apostila");
		        if (apostila == null) {
		            throw new IllegalArgumentException("O campo 'apostila' é obrigatório.");
		        }

		        // Chama o serviço para atualizar o campo 'apostila'
		        service.patchUpdateApostila(id, apostila);
		        return ResponseEntity.noContent().build();
		    }

		
			@DeleteMapping(value="/{id}")
			public ResponseEntity<VisitanteDTO>delete(@PathVariable Long id){
				 service.delete(id);
				return ResponseEntity.noContent().build();
			}
			
			@GetMapping(value="/search")
			public ResponseEntity <List<VisitanteDTO>>findByNomeIgnoreCaseContaining(@RequestParam(name = "nome", defaultValue= "") String nome){
				List<VisitanteDTO> result= service.findByNomeIgnoreCaseContaining(nome);
				return ResponseEntity.ok(result);
			}
			
}