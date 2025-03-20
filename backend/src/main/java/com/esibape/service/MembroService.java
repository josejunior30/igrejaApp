package com.esibape.service;



import java.time.LocalDate;
import java.time.Period;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.MembroDTO;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.Membro;
import com.esibape.repository.EBDCursoRepository;
import com.esibape.repository.MembroRepository;

@Service
public class MembroService {
    
    @Autowired
    private MembroRepository repository;

    @Autowired
    private EBDCursoRepository ebdCursoRepository;
    
    @Transactional(readOnly = true)
    public List<MembroDTO> findAll() {
        List<Membro> list = repository.findAll();
        list.forEach(this::atualizarIdade);
        return list.stream()
                   .map(MembroDTO::new)
                   .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MembroDTO findById(Long id) {
        Membro membro = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Membro não encontrado"));
        atualizarIdade(membro);
        return new MembroDTO(membro, membro.getEbdCurso());
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
    public MembroDTO addEbdCursoToMembro(Long membroId, Long cursoId) {
        Membro membro = repository.findById(membroId)
            .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        EBDCurso curso = ebdCursoRepository.findById(cursoId)
            .orElseThrow(() -> new EntityNotFoundException("Curso não encontrado"));

        membro.getEbdCurso().add(curso);
        repository.save(membro);

        return new MembroDTO(membro, membro.getEbdCurso());
    }
    


    private void copyDtoToEntity(MembroDTO dto, Membro entity) {
    	 atualizarIdade(entity);
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
        entity.setOpcaoCurso(dto.getOpcaoCurso());
        entity.setEstadoCivil(dto.getEstadoCivil());
        entity.setUrl(dto.getUrl());
        entity.setDesligamento(dto.getDesligamento());
        entity.setAno(dto.getAno());
        entity.setMembroTipo(dto.getMembroTipo());
        entity.setMembroStatus(dto.getMembroStatus());
    }
    
    
    @Transactional(readOnly = true)
	public List<MembroDTO> findByNomeIgnoreCaseContaining(String nome) {
		List<Membro> result = repository.findByNomeIgnoreCaseContaining(nome);
		 return  result.stream().map(x -> new MembroDTO(x)).toList();
		
	}
    public void atualizarIdade(Membro membro) {
        LocalDate dataNascimento = membro.getDataNascimento();
        
        if (dataNascimento != null) {
            LocalDate dataAtual = LocalDate.now();
            Period periodo = Period.between(dataNascimento, dataAtual);
            membro.setIdade(periodo.getYears());
        }
    }

        
    @Transactional(readOnly = true)
    public List<MembroDTO> findByMonthOfBirth(int mes) {
        List<Membro> result = repository.findByMonthOfBirth(mes);
        return result.stream()
                     .map(MembroDTO::new)
                     .collect(Collectors.toList());
    } 
    @Transactional
    public void patchOpcao(Long membroId, String opcaoCurso) {
        // Localiza o membro pelo ID, lança exceção se não encontrar
        Membro membro = repository.findById(membroId)
                                         .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        // Atualiza a opção do curso
        membro.setOpcaoCurso(opcaoCurso);

        // Salva o visitante atualizado no banco
        repository.save(membro);
    }
    @Transactional
    public void patchApostila(Long membroId, Boolean apostila) {
        // Localiza o Visitante pelo ID, lança exceção se não encontrar
        Membro membro = repository.findById(membroId)
                                         .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        // Atualiza o campo 'apostila'
        membro.setApostila(apostila != null ? apostila : false); // Garante um valor booleano válido

        // Salva o visitante atualizado no banco
        repository.save(membro);
    }

    @Transactional(readOnly = true)
    public List<MembroDTO> findNextBirthdays() {
        LocalDate today = LocalDate.now();
        
        List<Membro> membros = repository.findAll();
        
        List<Membro> proximosAniversariantes = membros.stream()
            .filter(membro -> membro.getDataNascimento() != null)
            .sorted(Comparator.comparing(membro -> {
                LocalDate aniversario = membro.getDataNascimento().withYear(today.getYear());
                if (aniversario.isBefore(today)) {
                    aniversario = aniversario.plusYears(1);
                }
                return aniversario;
            }))
            .limit(5)
            .toList();
        
        proximosAniversariantes.forEach(this::atualizarIdade);
        
        return proximosAniversariantes.stream()
            .map(MembroDTO::new)
            .collect(Collectors.toList());
    }

}

