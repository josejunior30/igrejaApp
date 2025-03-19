package com.esibape.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.TransacaoDTO;
import com.esibape.entities.Transacao;
import com.esibape.repository.TransacaoRepository;


@Service
public class TransacaoService {
    @Autowired
    private TransacaoRepository repository;

    @Transactional(readOnly = true)
    public List<TransacaoDTO> findAll() {
        return repository.findAll().stream()
            .map(TransacaoDTO::new)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TransacaoDTO findById(Long id) {
        Transacao entity = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada para o ID: " + id));
        
        return new TransacaoDTO(entity);
    }

    @Transactional
    public TransacaoDTO insert(TransacaoDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Transação não pode ser nula");
        }

        Transacao entity = new Transacao();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new TransacaoDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Transação não encontrada para o ID: " + id);
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<TransacaoDTO> buscarPorMesEAno(int mes, int ano) {
        return repository.findByMesEAno(mes, ano).stream()
            .map(TransacaoDTO::new)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TransacaoDTO> buscarPorAno(int ano) {
        return repository.findByAno(ano).stream()
            .map(TransacaoDTO::new)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TransacaoDTO> buscarPorDescricao(String descricao, Integer mes, int ano) {
        List<Transacao> transacoes;
        
        if (descricao == null || descricao.trim().isEmpty()) {
            throw new IllegalArgumentException("A descrição não pode ser nula ou vazia.");
        }

        if (mes == null || mes == 0) {
            transacoes = repository.buscarPorDescricaoEAno("%" + descricao + "%", ano);
        } else {
            transacoes = repository.buscarPorDescricaoMesEAno("%" + descricao + "%", mes, ano);
        }

        return transacoes.stream()
            .map(TransacaoDTO::new)
            .collect(Collectors.toList());
    }

    private void copyDtoToEntity(TransacaoDTO dto, Transacao entity) {
        entity.setData(dto.getData());
        entity.setDescricao(dto.getDescricao());
        Boolean receita = dto.getIsReceita();
        entity.setIsReceita(receita == null ? true : receita);
        entity.setTipoDespesa(dto.getTipoDespesa());
        entity.setValor(dto.getValor());
    }
}
