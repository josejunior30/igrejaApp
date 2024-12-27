package com.esibape.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
		    @PostMapping
			public ResponseEntity<VisitanteDTO> insert(@Valid @RequestBody VisitanteDTO dto) {
			    dto = service.insert(dto);
			    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
			                                         .path("/{id}")
			                                         .buildAndExpand(dto.getId())
			                                         .toUri();
			    return ResponseEntity.created(uri).body(dto);
			}

			@PutMapping(value="/{id}")
			public ResponseEntity<VisitanteDTO>update (@PathVariable Long id, @RequestBody VisitanteDTO dto){
				 dto =service.update(id, dto);
				return ResponseEntity.ok().body(dto);
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
			
			  @PatchMapping("/{visitanteId}/curso/{cursoId}/ebdCurso/{ebdCursoId}")
			    public ResponseEntity<Void> updateCurso(
			    		@PathVariable Long visitanteId, 
			    		@PathVariable Long cursoId,
			    		@PathVariable Long ebdCursoId) {
				  // Validação de entradas
					 if (visitanteId <= 0 || cursoId <= 0 || ebdCursoId <= 0) {
					        throw new IllegalArgumentException("IDs devem ser positivos e maiores que zero.");
					    }
					 // Delegando a lógica para o serviço
					    service.patchUpdateCurso(visitanteId, cursoId, ebdCursoId);

					    // Retorno de sucesso sem conteúdo
					    return ResponseEntity.noContent().build();
			    }
}