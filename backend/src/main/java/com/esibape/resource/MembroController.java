package com.esibape.resource;



import java.net.URI;
import java.util.List;

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

import com.esibape.DTO.MembroDTO;
import com.esibape.service.MembroService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/membro")
public class MembroController {
	
	@Autowired
	private MembroService service;
	
	
	@GetMapping
	public ResponseEntity <List<MembroDTO>>findAll(){
		List<MembroDTO> membro = service.findAll();
		return ResponseEntity.ok().body(membro);
	}
	
		@GetMapping(value="/{id}")
		public ResponseEntity<MembroDTO>findById(@PathVariable Long id){
			MembroDTO membro = service.findById(id);
			return ResponseEntity.ok().body(membro);
		}
	
		@PostMapping
		public ResponseEntity<MembroDTO> insert(@RequestBody MembroDTO dto){
			service.atualizarIdade(dto);
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
		  @GetMapping(value="/search1")
		  public ResponseEntity<List<MembroDTO>> findByPequenoGrupoApelido(@RequestParam String apelido) {
		        List<MembroDTO> membros = service.findByPequenoGrupoApelido(apelido);
		        return ResponseEntity.ok().body(membros);
		    }
		  
}