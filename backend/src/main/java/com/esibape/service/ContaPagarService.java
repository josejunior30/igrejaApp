package com.esibape.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.ContaPagarDTO;
import com.esibape.entities.ContaPagar;
import com.esibape.entities.StatusPagamento;
import com.esibape.entities.TipoDespesa;
import com.esibape.entities.Transacao;
import com.esibape.repository.ContaPagarRepository;
import com.esibape.repository.TransacaoRepository;



@Service
public class ContaPagarService {
    @Autowired
    private ContaPagarRepository repository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findAll() {
        List<ContaPagar> list = repository.findAll();
        list.forEach(this::atualizarStatusSeAtrasado);
        return list.stream()
            .map(ContaPagarDTO::new)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ContaPagarDTO findById(Long id) {
        return repository.findById(id)
            .map(contaPagar -> {
                atualizarStatusSeAtrasado(contaPagar);
                return new ContaPagarDTO(contaPagar);
            })
            .orElseThrow(() -> new EntityNotFoundException("ContaPagar não encontrada para o ID: " + id));
    }

    @Transactional
    public ContaPagarDTO insert(ContaPagarDTO dto) {
        ContaPagar entity = new ContaPagar();
        copyDtoToEntity(dto, entity);
        entity.setStatus(StatusPagamento.PENDENTE);
        entity.setCreatedByConta(getAuthenticatedUser());
        entity = repository.save(entity);
        return new ContaPagarDTO(entity);
    }

    public String getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) {
            return "Sistema";
        }
        if (auth.getPrincipal() instanceof String) {
            return (String) auth.getPrincipal();
        }
        if (auth.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) auth.getPrincipal()).getUsername();
        }
        return "Sistema";
    }

    @Transactional
    public ContaPagarDTO updateStatus(Long id, StatusPagamento novoStatus) {
        ContaPagar entity = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("ContaPagar não encontrada para o ID: " + id));

        entity.setStatus(novoStatus);

        if (novoStatus == StatusPagamento.PAGO) {
            entity.setCreatedBy(getAuthenticatedUser());

            Transacao transacao = new Transacao();
            transacao.setValor(entity.getValor());
            transacao.setData(LocalDate.now());
            transacao.setDescricao(entity.getDescricao());
            transacao.setIsReceita(false);
            transacao.setContaPagar(entity); 

            // Definir tipo de despesa antes de salvar
            if (entity.isFixa()) {
                transacao.setTipoDespesa(TipoDespesa.FIXO);
            } else {
                transacao.setTipoDespesa(TipoDespesa.VARIAVEL);
            }

            transacaoRepository.save(transacao);
        } else if (novoStatus == StatusPagamento.PENDENTE) {
            // Deletar a transação associada, se existir
            transacaoRepository.deleteByContaPagar(entity);
        }

        entity = repository.save(entity);
        return new ContaPagarDTO(entity);
    }

    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findByMesAnoDataCriacao(int mes, int ano) {
        LocalDateTime inicio = LocalDateTime.of(ano, mes, 1, 0, 0);
        LocalDateTime fim = inicio.withDayOfMonth(inicio.toLocalDate().lengthOfMonth()).withHour(23).withMinute(59).withSecond(59);

        return repository.findByDataCriacaoBetween(inicio, fim)
            .stream().map(ContaPagarDTO::new)
            .collect(Collectors.toList());
    }

    private void copyDtoToEntity(ContaPagarDTO dto, ContaPagar entity) {
        entity.setDataCriacao(dto.getDataCriacao());
        entity.setDataVencimento(dto.getDataVencimento());
        entity.setDescricao(dto.getDescricao());
        entity.setCreatedByConta(dto.getCreatedByConta());
        entity.setValor(dto.getValor());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setTipoDespesa(dto.getTipoDespesa());
    }

    @Transactional
    public void atualizarStatusSeAtrasado(ContaPagar contaPagar) {
        if (contaPagar.getStatus() == StatusPagamento.PENDENTE && contaPagar.getDataVencimento().isBefore(LocalDate.now())) {
            contaPagar.setStatus(StatusPagamento.ATRASADO);
            repository.save(contaPagar);
        }
    }

    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findByDescricaoStatusMesAno(String descricao, int mes, int ano) {
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        return repository.findByDescricaoContainingIgnoreCaseAndStatusAndDataVencimentoBetween(
                descricao, StatusPagamento.PAGO, inicio, fim)
            .stream().map(ContaPagarDTO::new)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ContaPagarDTO> findByDescricaoAndAno(String descricao, int ano) {
        LocalDate inicio = LocalDate.of(ano, 1, 1);
        LocalDate fim = LocalDate.of(ano, 12, 31);

        return repository.findByDescricaoContainingIgnoreCaseAndStatusAndDataVencimentoBetween(
                descricao, StatusPagamento.PAGO, inicio, fim)
            .stream().map(ContaPagarDTO::new)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteContaPagar(Long id) {
        ContaPagar entity = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("ContaPagar não encontrada para o ID: " + id));

        // Excluir transações associadas à ContaPagar
        transacaoRepository.deleteByContaPagar(entity);

        // Agora, excluir a ContaPagar
        repository.delete(entity);
    }
}