package com.esibape.service;



import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.MembroDTO;
import com.esibape.entities.Curso;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.Membro;
import com.esibape.repository.CursoRepository;
import com.esibape.repository.EBDCursoRepository;
import com.esibape.repository.MembroRepository;

@Service
public class MembroService {
    
    @Autowired
    private MembroRepository repository;

    @Autowired
    private CursoRepository cursoRepository;
    @Autowired
    private EBDCursoRepository ebdCursoRepository;
    
    @Transactional(readOnly = true)
    public List<MembroDTO> findAll() {
        List<Membro> list = repository.findAll();
        return list.stream()
                   .map(x -> new MembroDTO(x)) 
                   .collect(Collectors.toList());
    }

 
    @Transactional(readOnly = true)
    public MembroDTO findById(Long id) {
    	Optional<Membro> membro = repository.findById(id);
    	Membro entity = membro.get();
    	return  new MembroDTO(entity);
    }
   
    @Transactional
    public MembroDTO insert( MembroDTO dto) {
    		Membro entity =  new Membro();
    		copyDtoToEntity(dto, entity);	
    		entity = repository.save(entity);
    		return new MembroDTO(entity);
    	
    }
    
    @Transactional
    public MembroDTO update(Long id, MembroDTO dto) {
    	Membro entity=repository.getReferenceById(id);
    	copyDtoToEntity(dto, entity);
    	
    	entity = repository.save(entity);
		return new MembroDTO(entity);
    }
    public void delete(Long id) {
    	repository.deleteById(id);
    }
    
    
    	@Transactional
    	public void patchUpdateCurso(Long membroId, Long cursoId, Long ebdCursoId) {
    	    // Busca o membro pelo ID
    	    Membro membro = repository.findById(membroId)
    	                              .orElseThrow(() -> new EntityNotFoundException("Membro não encontrado"));

    	    // Busca o curso pelo ID
    	    Curso curso = cursoRepository.findById(cursoId)
    	                                 .orElseThrow(() -> new EntityNotFoundException("Curso não encontrado"));

    	    // Busca o EBDCurso pelo ID
    	    EBDCurso ebdCurso = ebdCursoRepository.findById(ebdCursoId)
    	                                          .orElseThrow(() -> new EntityNotFoundException("EBDCurso não encontrado"));

    	    // Associa o membro ao curso e ao EBDCurso
    	    membro.setCurso(curso);
    	    membro.setEbdCurso(ebdCurso);

    	    // Persistência ocorre automaticamente se o membro é uma entidade gerenciada
    	}

    private void copyDtoToEntity(MembroDTO dto, Membro entity) {
    	atualizarIdade(dto);
		entity.setNome(dto.getNome());
		entity.setSobrenome(dto.getSobrenome());
		entity.setEmail(dto.getEmail());
		entity.setDataNascimento(dto.getDataNascimento());
		entity.setIdade(dto.getIdade());
		entity.setTelefone(dto.getTelefone());
		entity.setCpf(dto.getCpf());
		entity.setBairro(dto.getBairro());
		entity.setCep(dto.getCep());
		entity.setCidade(dto.getCidade());
		entity.setComplemento(dto.getComplemento());
		entity.setRua(dto.getRua());
		entity.setNumero(dto.getNumero());
		entity.setEstadoCivil(dto.getEstadoCivil());
		entity.setUrl(dto.getUrl());
		entity.setStatus(dto.getStatus());
	  
	}	
    
    @Transactional(readOnly = true)
	public List<MembroDTO> findByNomeIgnoreCaseContaining(String nome) {
		List<Membro> result = repository.findByNomeIgnoreCaseContaining(nome);
		 return  result.stream().map(x -> new MembroDTO(x)).toList();
		
	}
 
    public void atualizarIdade(MembroDTO dto) {
        LocalDate dataNascimento = dto.getDataNascimento();
        Integer idadeAtual = dto.getIdade(); 
        
        // Calcula a idade apenas se a idade estiver vazia
        if (dataNascimento != null && idadeAtual == null) {
            LocalDate dataAtual = LocalDate.now();
            Period periodo = Period.between(dataNascimento, dataAtual);
            dto.setIdade(periodo.getYears());
        }
    }
        
        
    
    
}

