
package com.esibape.controller;

import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.esibape.DTO.CalendarioDTO;
import com.esibape.entities.Calendario;
import com.esibape.service.CalendarioService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/calendario")
public class CalendarioController {
	
	@Autowired
	private CalendarioService service;
	
	
	@GetMapping
	public ResponseEntity<List<CalendarioDTO>>findAll(){
		List<CalendarioDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<CalendarioDTO> findById(@PathVariable Long id) {
    	CalendarioDTO result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }

	
	@PostMapping
	public ResponseEntity<CalendarioDTO> insert(@RequestBody CalendarioDTO dto){
		CalendarioDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}

	@DeleteMapping(value="/{id}")
	public ResponseEntity<Void>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	// 🔍 Buscar eventos pelo título no ano atual
    @GetMapping("/titulo/{titulo}")
    public List<Calendario> buscarPorTitulo(@PathVariable String titulo) {
        return service.buscarPorTitulo(titulo);
    }

    // 🔍 Buscar eventos pelo responsável no ano atual
    @GetMapping("/responsavel/{responsavel}")
    public List<Calendario> buscarPorResponsavel(@PathVariable String responsavel) {
        return service.buscarPorResponsavel(responsavel);
    }
}
