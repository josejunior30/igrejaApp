package com.esibape.controller;



import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.esibape.DTO.MembroDTO;
import com.esibape.service.MembroService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/membro")
public class MembroController {
	
	
	@Autowired
	private MembroService service;
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity <List<MembroDTO>>findAll(){
		List<MembroDTO> membro = service.findAll();
		return ResponseEntity.ok().body(membro);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
		@GetMapping(value="/{id}")
		public ResponseEntity<MembroDTO>findById(@PathVariable Long id){
			MembroDTO membro = service.findById(id);
			return ResponseEntity.ok().body(membro);
		}
	
		@PostMapping
		public ResponseEntity<MembroDTO> insert(@RequestBody MembroDTO dto){
			MembroDTO entity = service.insert(dto);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getId()).toUri();
			
			return ResponseEntity.created(uri).body(entity);
		}		
		

		@PutMapping(value="/{id}")
		public ResponseEntity<MembroDTO>update (@PathVariable Long id, @RequestBody MembroDTO dto){
			 dto =service.update(id, dto);
			return ResponseEntity.ok().body(dto);
		}
		
		@DeleteMapping(value="/{id}")
		public ResponseEntity<MembroDTO>delete(@PathVariable Long id){
			 service.delete(id);
			return ResponseEntity.noContent().build();
		}
		
		@GetMapping(value="/search")
		public ResponseEntity <List<MembroDTO>>findByNomeIgnoreCaseContaining(@RequestParam(name = "nome", defaultValue= "") String nome){
			List<MembroDTO> result= service.findByNomeIgnoreCaseContaining(nome);
			return ResponseEntity.ok(result);
		}

		
	    @PostMapping("/{membroId}/curso/{cursoId}")
	    public ResponseEntity<MembroDTO> addEbdCurso(@PathVariable Long membroId, @PathVariable Long cursoId) {
	        MembroDTO dto = service.addEbdCursoToMembro(membroId, cursoId);
	        return ResponseEntity.ok().body(dto);
	    }
	    
		
		
		  @GetMapping(value = "/por-mes")
		    public ResponseEntity<List<MembroDTO>> findByMonthOfBirth(@RequestParam(name = "mes") int mes) {
		        if (mes < 1 || mes > 12) {
		            throw new IllegalArgumentException("O mês deve ser entre 1 e 12.");
		        }
		        List<MembroDTO> result = service.findByMonthOfBirth(mes);
		        return ResponseEntity.ok(result);
		    }
		    @PatchMapping(value = "/{id}/opcao-curso")
		    public ResponseEntity<Void> patchOpcao(@PathVariable Long id, @RequestBody String opcaoCurso) {
		        service.patchOpcao(id, opcaoCurso);
		        return ResponseEntity.noContent().build();
		    }
		    
		    @PatchMapping(value = "/{id}/opcao-apostila")
		    public ResponseEntity<Void> patchUApostila(
		            @PathVariable Long id, 
		            @RequestBody Map<String, Boolean> body) {

		        // Extrai o valor de 'apostila' do corpo da requisição
		        Boolean apostila = body.get("apostila");
		        if (apostila == null) {
		            throw new IllegalArgumentException("O campo 'apostila' é obrigatório.");
		        }

		        // Chama o serviço para atualizar o campo 'apostila'
		        service.patchApostila(id, apostila);
		        return ResponseEntity.noContent().build();
		    }

		    

}