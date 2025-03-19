package com.esibape.controller;



import java.net.URI;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.DTO.QuantidadePorCultoDTO;
import com.esibape.entities.TipoCulto;
import com.esibape.service.QuantidadePorCultoService;



@RestController
@RequestMapping(value = "/quantidade")
public class QuantidadePorCultoController {
	
	
	@Autowired
	private QuantidadePorCultoService service;
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity <List<QuantidadePorCultoDTO>>findAll(){
		List<QuantidadePorCultoDTO> QuantidadePorCulto = service.findAll();
		return ResponseEntity.ok().body(QuantidadePorCulto);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
		@GetMapping(value="/{id}")
		public ResponseEntity<QuantidadePorCultoDTO>findById(@PathVariable Long id){
		QuantidadePorCultoDTO QuantidadePorCulto = service.findById(id);
			return ResponseEntity.ok().body(QuantidadePorCulto);
		}
	
		@PostMapping
		public ResponseEntity<QuantidadePorCultoDTO> insert(@RequestBody QuantidadePorCultoDTO dto){
			QuantidadePorCultoDTO entity = service.insert(dto);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getId()).toUri();
			
			return ResponseEntity.created(uri).body(entity);
		}		
		

		@PutMapping(value="/{id}")
		public ResponseEntity<QuantidadePorCultoDTO>update (@PathVariable Long id, @RequestBody QuantidadePorCultoDTO dto){
			 dto =service.update(id, dto);
			return ResponseEntity.ok().body(dto);
		}
		
		@DeleteMapping(value="/{id}")
		public ResponseEntity<QuantidadePorCultoDTO>delete(@PathVariable Long id){
			 service.delete(id);
			return ResponseEntity.noContent().build();
		}
		
		@GetMapping(value = "/mes/{mes}")
	    public ResponseEntity<List<QuantidadePorCultoDTO>> findByMes(@PathVariable int mes) {
	        List<QuantidadePorCultoDTO> cultosPorMes = service.findByMes(mes);
	        return ResponseEntity.ok().body(cultosPorMes);
	    }
		
		@GetMapping("/media/{ano}/{tipoCulto}")
		public ResponseEntity<Integer> getMediaTotal(@PathVariable int ano, @PathVariable TipoCulto tipoCulto) {
		    Integer media = service.findMediaTotalByAnoAndTipoCulto(ano, tipoCulto);
		    return ResponseEntity.ok(media);
		}

}