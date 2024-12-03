package com.esibape.controller;

import java.net.URI;
import java.time.YearMonth;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.esibape.DTO.ListaPresencaVisitanteEBDDTO;
import com.esibape.entities.ChamadaVisitante;
import com.esibape.service.ListaPresencaVisitanteEBDService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/presencaVisitante")
public class ListaPresencaVisitanteEBDController {
	
	@Autowired
	private ListaPresencaVisitanteEBDService service;
	@GetMapping
	public ResponseEntity<List<ListaPresencaVisitanteEBDDTO>>findAll(){
		List<ListaPresencaVisitanteEBDDTO>list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<ListaPresencaVisitanteEBDDTO>findById(@PathVariable Long id){
		ListaPresencaVisitanteEBDDTO chamada = service.findById(id);
		return ResponseEntity.ok().body(chamada);
	}
	

	
   @PostMapping
   public ResponseEntity <ListaPresencaVisitanteEBDDTO> insert(@RequestBody ListaPresencaVisitanteEBDDTO dto) {
	   ListaPresencaVisitanteEBDDTO entity = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
 
		 }
   @GetMapping("/listas-presenca")
   public List<ListaPresencaVisitanteEBDDTO> getListasPorMesEProjeto(
           @RequestParam("ano") int ano,
           @RequestParam("mes") int mes,
           @RequestParam("cursoId") Long cursoId) {
       YearMonth yearMonth = YearMonth.of(ano, mes);
       return service.findByMonthAndCurso(yearMonth, cursoId);
   }
   
   @GetMapping("/chamadas-visitante")
   public List<ChamadaVisitante> getChamadasPorVisitanteEMes(
           @RequestParam("visitanteId") Long visitanteId,
           @RequestParam("ano") int ano,
           @RequestParam("mes") int mes) {
       YearMonth yearMonth = YearMonth.of(ano, mes);
       return service.findChamadaVisitanteByVisitanteAndMonth(visitanteId, yearMonth);
   }
}
