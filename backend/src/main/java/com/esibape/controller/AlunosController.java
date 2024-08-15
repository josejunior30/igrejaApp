package com.esibape.controller;

import java.net.URI;
import java.time.LocalTime;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

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

import com.esibape.service.AlunosService;


@RestController
@RequestMapping(value="/alunos")
public class AlunosController {
	
	@Autowired
private AlunosService service;

@GetMapping
public ResponseEntity <List<AlunosDTO>>findAll(){
	List<AlunosDTO> alunos = service.findAll();
	return ResponseEntity.ok().body(alunos);
}

	@GetMapping("/todos")
public ResponseEntity<List<AlunosDTO>> getTodosOsAlunos() {
    return ResponseEntity.ok(service.findAllAlunos());
}


	@GetMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>findById(@PathVariable Long id){
		AlunosDTO alunos = service.findById(id);
		return ResponseEntity.ok().body(alunos);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping
	public ResponseEntity<AlunosDTO> insert(@RequestBody AlunosDTO dto){
		AlunosDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>update (@PathVariable Long id, @RequestBody AlunosDTO dto){
		 dto =service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<AlunosDTO>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(value="/search")
	public ResponseEntity <List<AlunosDTO>>findByNomeIgnoreCaseContaining(@RequestParam(name = "nome", defaultValue= "") String nome){
		List<AlunosDTO> result= service.findByNomeIgnoreCaseContaining(nome);
		return ResponseEntity.ok(result);
	}
    @GetMapping(value = "/searchByHorario")
    public ResponseEntity<List<AlunosDTO>> findByHorario(@RequestParam(name = "horario") String horario) {
        LocalTime localTime = LocalTime.parse(horario);
        List<AlunosDTO> result = service.findByHorario(localTime);
        return ResponseEntity.ok(result);
    }
    @GetMapping(value = "/searchByProjeto")
    public ResponseEntity<List<AlunosDTO>> findByProjetoId(@RequestParam(name = "projetoId") Long projetoId) {
        List<AlunosDTO> result = service.findByProjetoId(projetoId);
        return ResponseEntity.ok(result);
    }
    @GetMapping(value = "/searchByProjetoAndHorario")
    public ResponseEntity<List<AlunosDTO>> findByProjetoIdAndHorario(@RequestParam(name = "projetoId") Long projetoId,
                                                                    @RequestParam(name = "horario") String horario) {
        LocalTime localTime = LocalTime.parse(horario);
        List<AlunosDTO> result = service.findByProjetoIdAndHorario(projetoId, localTime);
        return ResponseEntity.ok(result);
    }

}
