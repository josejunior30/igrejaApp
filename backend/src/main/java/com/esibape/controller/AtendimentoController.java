
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
import com.esibape.DTO.AtendimentoDTO;
import com.esibape.service.AtendimentoService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/atendimento")
public class AtendimentoController {
	
	@Autowired
	private AtendimentoService service;
	
	
	@GetMapping
	public ResponseEntity<List<AtendimentoDTO>>findAll(){
		List<AtendimentoDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<AtendimentoDTO> findById(@PathVariable Long id) {
    	AtendimentoDTO result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }
    @PostMapping
	public ResponseEntity<AtendimentoDTO> insert(@RequestBody AtendimentoDTO dto){
    	AtendimentoDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}

    @GetMapping("/ano/{year}")
    public ResponseEntity<List<AtendimentoDTO>> getByYear(@PathVariable int year) {
        List<AtendimentoDTO> atendimentos = service.findByYear(year);
        return ResponseEntity.ok(atendimentos);
    }
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<Void>delete(@PathVariable Long id){
		 service.delete(id);
		return ResponseEntity.noContent().build();
	}
	@GetMapping("/mes/{mes}/ano/{ano}")
    public ResponseEntity<List<AtendimentoDTO>> findByMesEAno(@PathVariable int mes, @PathVariable int ano) {
        List<AtendimentoDTO> lista = service.findByMesEAno(mes, ano);
        return ResponseEntity.ok().body(lista);
    }
}
