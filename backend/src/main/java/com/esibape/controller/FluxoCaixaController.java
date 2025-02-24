package com.esibape.controller;



import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esibape.DTO.FluxoCaixaDTO;
import com.esibape.entities.FluxoCaixa;
import com.esibape.service.FluxoCaixaService;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/fluxo-caixa")
public class FluxoCaixaController {

    
    @Autowired
    private FluxoCaixaService service;

  /*  @GetMapping("/receita-total")
    public BigDecimal getReceitaTotal() {
        return service.calcularReceitaTotal();
    }

    @GetMapping("/despesa-total")
    public BigDecimal getDespesaTotal() {
        return service.calcularDespesaTotal();
    }

    @GetMapping("/saldo")
    public FluxoCaixa getSaldo() {
        return service.calcularFluxo();
    }
    */

    @GetMapping("/{mes}/{ano}")
    public FluxoCaixa getFluxoPorMes(@PathVariable Integer mes, @PathVariable Integer ano) {
        return service.calcularFluxoParaMes(mes, ano);
    }
	@GetMapping
	public ResponseEntity <List<FluxoCaixaDTO>>findAll(){
		List<FluxoCaixaDTO> fluxoCaixa = service.findAll();
		return ResponseEntity.ok().body(fluxoCaixa);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
		@GetMapping(value="/{id}")
		public ResponseEntity<FluxoCaixaDTO>findById(@PathVariable Long id){
		FluxoCaixaDTO fluxoCaixa = service.findById(id);
			return ResponseEntity.ok().body(fluxoCaixa);
		}
	
	 @GetMapping("/acumulado/{mes}/{ano}")
	    public ResponseEntity<FluxoCaixaDTO> getFluxoCaixaAcumulado(@PathVariable Integer mes, @PathVariable Integer ano) {
	        FluxoCaixa fluxoCaixa = service.calcularFluxoAcumuladoAteMes(mes, ano);
	        return ResponseEntity.ok(new FluxoCaixaDTO(fluxoCaixa));
	    }
	
}
