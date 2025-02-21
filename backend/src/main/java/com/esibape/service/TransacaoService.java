package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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
        List<Transacao> list = repository.findAll();
        return list.stream()
                   .map(TransacaoDTO::new) 
                   .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public TransacaoDTO findById(Long id) {
    	Optional<Transacao> transacao = repository.findById(id);
    	Transacao entity =transacao.get();
    	
    	return  new TransacaoDTO(entity);
    }
   
	
	@Transactional
    public TransacaoDTO insert( TransacaoDTO dto) {
		Transacao entity = new Transacao();	
	        copyDtoToEntity(dto, entity);
	        entity = repository.save(entity);
	        return new TransacaoDTO(entity);
	}
   
	   public void delete(Long id) {
	    	repository.deleteById(id);
	 
	   }
	   
	private void copyDtoToEntity(TransacaoDTO dto, Transacao entity) {
		entity.setData(dto.getData());
		entity.setDescricao(dto.getDescricao());
		entity.setIsReceita(dto.getIsReceita());
		entity.setTipoDespesa(dto.getTipoDespesa());
		entity.setValor(dto.getValor());
		
	
	}

	
}
