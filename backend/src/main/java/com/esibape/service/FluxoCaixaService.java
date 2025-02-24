package com.esibape.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.FluxoCaixaDTO;
import com.esibape.entities.FluxoCaixa;
import com.esibape.entities.TipoDespesa;
import com.esibape.entities.Transacao;
import com.esibape.repository.FluxoCaixaRepository;
import com.esibape.repository.TransacaoRepository;


@Service
public class FluxoCaixaService {
    @Autowired
    private TransacaoRepository transacaoRepository;
    
    @Autowired
    private FluxoCaixaRepository repository;

   /* public BigDecimal calcularReceitaTotal() {
        List<Transacao> receitas = transacaoRepository.findByIsReceita(true);
        return receitas.stream()
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calcularDespesaTotal() {
        List<Transacao> despesas = transacaoRepository.findByIsReceita(false);
        return despesas.stream()
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public FluxoCaixa calcularFluxo() {
        BigDecimal receitaTotal = calcularReceitaTotal();
        BigDecimal despesaTotal = calcularDespesaTotal();
        BigDecimal saldoLiquido = receitaTotal.subtract(despesaTotal);

        return new FluxoCaixa(null, receitaTotal, despesaTotal, saldoLiquido);
    }*/
    
    public FluxoCaixa calcularFluxoParaMes(Integer mes, Integer ano) {
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        List<Transacao> transacoes = transacaoRepository.findByDataBetween(inicio, fim);

        BigDecimal receitaTotal = transacoes.stream()
                .filter(Transacao::getIsReceita)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesaTotal = transacoes.stream()
                .filter(t -> !t.getIsReceita())
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesaFixa = transacoes.stream()
                .filter(t -> !t.getIsReceita() && t.getTipoDespesa() == TipoDespesa.FIXO)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesaVariavel = transacoes.stream()
                .filter(t -> !t.getIsReceita() && t.getTipoDespesa() == TipoDespesa.VARIAVEL)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal saldoLiquido = receitaTotal.subtract(despesaTotal);

        // Verifica se já existe um fluxo de caixa para o mês
        FluxoCaixa fluxoCaixa = repository.findByMesAndAno(mes, ano);
        if (fluxoCaixa == null) {
            fluxoCaixa = new FluxoCaixa(null, receitaTotal, despesaTotal, saldoLiquido, despesaFixa, despesaVariavel, mes, ano);
        } else {
            fluxoCaixa.setReceitaTotal(receitaTotal);
            fluxoCaixa.setDespesaTotal(despesaTotal);
            fluxoCaixa.setDespesaFixa(despesaFixa);
            fluxoCaixa.setDespesaVariavel(despesaVariavel);
            fluxoCaixa.setSaldoLiquido(saldoLiquido);
        }

        return repository.save(fluxoCaixa);
    }

    
    @Transactional
    public FluxoCaixa calcularFluxoAcumuladoAteMes(Integer mes, Integer ano) {
        LocalDate inicioAno = LocalDate.of(ano, 1, 1);
        LocalDate fimMesAtual = LocalDate.of(ano, mes, 1).withDayOfMonth(LocalDate.of(ano, mes, 1).lengthOfMonth());

        List<Transacao> transacoes = transacaoRepository.findByDataBetween(inicioAno, fimMesAtual);

        BigDecimal receitaTotal = transacoes.stream()
                .filter(Transacao::getIsReceita)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesaTotal = transacoes.stream()
                .filter(t -> !t.getIsReceita())
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesaFixa = transacoes.stream()
                .filter(t -> !t.getIsReceita() && t.getTipoDespesa() == TipoDespesa.FIXO)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesaVariavel = transacoes.stream()
                .filter(t -> !t.getIsReceita() && t.getTipoDespesa() == TipoDespesa.VARIAVEL)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal saldoLiquido = receitaTotal.subtract(despesaTotal);

        FluxoCaixa fluxoCaixa = repository.findByMesAndAno(mes, ano);
        if (fluxoCaixa == null) {
            fluxoCaixa = new FluxoCaixa(null, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, mes, ano);
        }

        fluxoCaixa.setReceitaTotal(receitaTotal);
        fluxoCaixa.setDespesaTotal(despesaTotal);
        fluxoCaixa.setDespesaFixa(despesaFixa);
        fluxoCaixa.setDespesaVariavel(despesaVariavel);
        fluxoCaixa.setSaldoLiquido(saldoLiquido);

        return repository.save(fluxoCaixa);
    }
    @Transactional(readOnly = true)
    public List<FluxoCaixaDTO> findAll() {
        List<FluxoCaixa> list = repository.findAll();
        return list.stream()
                   .map(FluxoCaixaDTO::new) 
                   .collect(Collectors.toList());
    }

 
    @Transactional(readOnly = true)
    public FluxoCaixaDTO findById(Long id) {
    	Optional<FluxoCaixa> fluxoCaixa = repository.findById(id);
    	FluxoCaixa entity =fluxoCaixa.get();
    	
    	return  new FluxoCaixaDTO(entity);
    }
   
	
}


	

