package com.esibape.resource;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.esibape.DTO.ChamadaDTO;
import com.esibape.service.ChamadaService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/chamada")
public class ChamadaController {
	
	@Autowired
	private ChamadaService service;
	@GetMapping
	public ResponseEntity<List<ChamadaDTO>>findAll(){
		List<ChamadaDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<ChamadaDTO>findById(@PathVariable Long id){
		ChamadaDTO chamada = service.findById(id);
		return ResponseEntity.ok().body(chamada);
	}
	
	@GetMapping(value="/data")
	public ResponseEntity<List<ChamadaDTO>> findAll(@RequestParam(name = "data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        List<ChamadaDTO> chamadas = service.findAll(data);
        return ResponseEntity.ok().body(chamadas);
    }
	
   @GetMapping(value="/dataProjeto")
    public ResponseEntity<List<ChamadaDTO>> findByDataAndProjetos(
            @RequestParam(name = "data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
            @RequestParam(name = "projeto") Long projetoId) {
        List<ChamadaDTO> chamadas = service.findByDataAndProjeto(data, projetoId);
        return ResponseEntity.ok().body(chamadas);
    } 

   @PostMapping
   public ResponseEntity <ChamadaDTO> insert(@RequestBody ChamadaDTO dto) {
	 ChamadaDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
 
		 }
	 
		
	

}
