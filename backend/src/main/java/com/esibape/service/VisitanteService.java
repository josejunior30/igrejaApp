package com.esibape.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.VisitanteDTO;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.Visitante;
import com.esibape.repository.EBDCursoRepository;
import com.esibape.repository.VisitanteRepository;

@Service
public class VisitanteService {

    @Autowired
    private VisitanteRepository repository;

 

    @Autowired
    private EBDCursoRepository ebdCursoRepository;

 
    @Transactional(readOnly = true)
    public List<VisitanteDTO> findAll() {
        List<Visitante> list = repository.findAll();
        list.forEach(this::atualizarIdade);
        return list.stream()
                   .map(VisitanteDTO::new)
                   .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public VisitanteDTO findById(Long id) {
        Visitante visitante = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Membro não encontrado"));
        atualizarIdade(visitante);
        return new VisitanteDTO(visitante, visitante.getEbdCursoVisitante());
    }
    @Transactional
    public VisitanteDTO insertWithEbdCurso(VisitanteDTO dto, Long cursoId) {
        Visitante entity = new Visitante();
        copyDtoToEntity(dto, entity, cursoId);
        entity = repository.save(entity);
        return new VisitanteDTO(entity, entity.getEbdCursoVisitante());
    }
    @Transactional
    public VisitanteDTO insertSemCurso( VisitanteDTO dto) {
    	 Visitante entity =  new Visitante();
    	 copyDtoToEntityNotCUrso(dto, entity);	
    		entity = repository.save(entity);
    		return new VisitanteDTO(entity);
    	
    }
    @Transactional
    public VisitanteDTO update(Long id, VisitanteDTO dto) {
    	Visitante entity=repository.getReferenceById(id);
    	copyDtoToEntityNotCUrso(dto, entity);
    	
    	entity = repository.save(entity);
		return new VisitanteDTO(entity);
    }
 
    
    
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Visitante não encontrado");
        }
        repository.deleteById(id);
    }

    @Transactional
    public VisitanteDTO addEbdCursoToVisitante(Long visitanteId, Long cursoId) {
        Visitante visitante = repository.findById(visitanteId)
            .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        EBDCurso curso = ebdCursoRepository.findById(cursoId)
            .orElseThrow(() -> new EntityNotFoundException("Curso não encontrado"));

        visitante.getEbdCursoVisitante().add(curso);
        repository.save(visitante);

        return new VisitanteDTO(visitante, visitante.getEbdCursoVisitante());
    }
    
    
    @Transactional
    public void patchUpdateOpcao(Long visitanteId, String opcaoCurso) {
        // Localiza o Visitante pelo ID, lança exceção se não encontrar
        Visitante visitante = repository.findById(visitanteId)
                                         .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        // Atualiza a opção do curso
        visitante.setOpcaoCurso(opcaoCurso);

        // Salva o visitante atualizado no banco
        repository.save(visitante);
    }
    
    @Transactional
    public void patchUpdateApostila(Long visitanteId, Boolean apostila) {
        // Localiza o Visitante pelo ID, lança exceção se não encontrar
        Visitante visitante = repository.findById(visitanteId)
                                         .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        // Atualiza o campo 'apostila'
        visitante.setApostila(apostila != null ? apostila : false); // Garante um valor booleano válido

        // Salva o visitante atualizado no banco
        repository.save(visitante);
    }

    @Transactional
    public void patchUpdateCurso(Long visitanteId, Long ebdCursoId) {
        Visitante visitante = repository.findById(visitanteId)
                                         .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        repository.save(visitante);
    }


    @Transactional(readOnly = true)
    public List<VisitanteDTO> findByNomeIgnoreCaseContaining(String nome) {
        return repository.findByNomeIgnoreCaseContaining(nome).stream()
                         .map(VisitanteDTO::new)
                         .collect(Collectors.toList());
    }

    private void copyDtoToEntity(VisitanteDTO dto, Visitante entity,  Long cursoId) {
    	 atualizarIdade(entity);
        entity.setNome(dto.getNome());
        entity.setSobrenome(dto.getSobrenome());
        entity.setDataNascimento(dto.getDataNascimento());
        entity.setEmail(dto.getEmail());
        entity.setTelefone(dto.getTelefone());
        entity.setOpcaoCurso(dto.getOpcaoCurso());
        entity.setApostila(dto.getApostila());
        entity.setCidade(dto.getCidade());
        entity.setBairro(dto.getBairro());
        entity.setRua(dto.getRua());
        entity.setComplemento(dto.getComplemento());
        entity.setCep(dto.getCep());
        entity.setUrl(dto.getUrl());
        entity.setNumero(dto.getNumero());
        entity.setEstadoCivil(dto.getEstadoCivil());
        entity.setVisitanteStatus(dto.getVisitanteStatus());
        
        


        EBDCurso curso = ebdCursoRepository.findById(cursoId)
            .orElseThrow(() -> new EntityNotFoundException("Curso não encontrado"));
        entity.getEbdCursoVisitante().add(curso);
    }

    private void copyDtoToEntityNotCUrso(VisitanteDTO dto, Visitante entity) {
   	 atualizarIdade(entity);
       entity.setNome(dto.getNome());
       entity.setSobrenome(dto.getSobrenome());
       entity.setDataNascimento(dto.getDataNascimento());
       entity.setEmail(dto.getEmail());
       entity.setTelefone(dto.getTelefone());
       entity.setOpcaoCurso(dto.getOpcaoCurso());
       entity.setApostila(dto.getApostila());
       entity.setCidade(dto.getCidade());
       entity.setBairro(dto.getBairro());
       entity.setRua(dto.getRua());
       entity.setComplemento(dto.getComplemento());
       entity.setCep(dto.getCep());
       entity.setUrl(dto.getUrl());
       entity.setNumero(dto.getNumero());
       entity.setEstadoCivil(dto.getEstadoCivil());
       entity.setVisitanteStatus(dto.getVisitanteStatus());
    }

    public void atualizarIdade(Visitante visitante) {
        LocalDate dataNascimento = visitante.getDataNascimento();
        
        if (dataNascimento != null) {
            LocalDate dataAtual = LocalDate.now();
            Period periodo = Period.between(dataNascimento, dataAtual);
            visitante.setIdade(periodo.getYears());
        }
    }
   
	

   
}
