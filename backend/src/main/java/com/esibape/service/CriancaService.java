package com.esibape.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.CriancaDTO;
import com.esibape.entities.Crianca;
import com.esibape.repository.CriancaRepository;


@Service
public class CriancaService {
    
    @Autowired
    private CriancaRepository repository;

  
    
    @Transactional(readOnly = true)
    public List<CriancaDTO> findAll() {
        List<Crianca> list = repository.findAll();
        list.forEach(this::atualizarIdade);
        return list.stream()
                   .map(CriancaDTO::new) 
                   .collect(Collectors.toList());
    }

 
    @Transactional(readOnly = true)
    public CriancaDTO findById(Long id) {
    	Optional<Crianca> crianca = repository.findById(id);
    	Crianca entity = crianca.get();
    	atualizarIdade(entity);
    	return  new CriancaDTO(entity);
    }
   
    @Transactional
    public CriancaDTO insert(CriancaDTO dto) {
    	Crianca entity =  new Crianca();
    		copyDtoToEntity(dto, entity);	
    		entity = repository.save(entity);
    		return new CriancaDTO(entity);
    	
    }
    
    @Transactional
    public CriancaDTO update(Long id, CriancaDTO dto) {
    	Crianca entity=repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity);
    	entity = repository.save(entity);
		return new CriancaDTO(entity);
    }
    
    public void delete(Long id) {
    	repository.deleteById(id);
    }
    
    private void copyDtoToEntity(CriancaDTO dto, Crianca entity) {
    	atualizarIdade(entity);
		entity.setNome(dto.getNome());
		entity.setSobrenome(dto.getSobrenome());
		entity.setBairro(dto.getBairro());
		entity.setCep(dto.getCep());
		entity.setCidade(dto.getCidade());
		entity.setComplemento(dto.getComplemento());
		entity.setRua(dto.getRua());
		entity.setNumero(dto.getNumero());
		entity.setDataNascimento(dto.getDataNascimento());
		entity.setIdade(dto.getIdade());
		entity.setTelefone(dto.getTelefone());
		entity.setUrl(dto.getUrl());
		entity.setCriancaStatus(dto.getCriancaStatus());
	  entity.setMembroStatus(dto.getMembroStatus());
	entity.setResponsavel(dto.getResponsavel());
    
    
    }	
    
    
   
    public void atualizarIdade(Crianca crianca) {
        LocalDate dataNascimento = crianca.getDataNascimento();
    
        
        // Calcula a idade apenas se a idade estiver vazia
        if (dataNascimento != null) {
            LocalDate dataAtual = LocalDate.now();
            Period periodo = Period.between(dataNascimento, dataAtual);
            crianca.setIdade(periodo.getYears());
        }
    }
    

   
        
}

