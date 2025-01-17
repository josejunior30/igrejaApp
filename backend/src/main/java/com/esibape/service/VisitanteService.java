package com.esibape.service;

import java.util.List;

import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.VisitanteDTO;
import com.esibape.entities.Curso;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.Visitante;
import com.esibape.repository.CursoRepository;
import com.esibape.repository.EBDCursoRepository;
import com.esibape.repository.VisitanteRepository;

@Service
public class VisitanteService {

    @Autowired
    private VisitanteRepository repository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private EBDCursoRepository ebdCursoRepository;

    @Transactional(readOnly = true)
    public List<VisitanteDTO> findAll() {
        return repository.findAll().stream()
                         .map(VisitanteDTO::new)
                         .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public VisitanteDTO findById(Long id) {
        Visitante entity = repository.findById(id)
                                     .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));
        return new VisitanteDTO(entity);
    }

    @Transactional
    public VisitanteDTO insert(@Valid VisitanteDTO dto) {
        Visitante entity = new Visitante();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new VisitanteDTO(entity);
    }

    @Transactional
    public VisitanteDTO update(Long id, @Valid VisitanteDTO dto) {
        Visitante entity = repository.findById(id)
                                      .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));
        copyDtoToEntity(dto, entity);
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
    public void patchUpdateCurso(Long visitanteId, Long cursoId, Long ebdCursoId) {
        Visitante visitante = repository.findById(visitanteId)
                                         .orElseThrow(() -> new EntityNotFoundException("Visitante não encontrado"));

        visitante.setCurso(findCursoById(cursoId));
        visitante.setEbdCursoVisitante(findEbdCursoById(ebdCursoId));
        repository.save(visitante);
    }


    @Transactional(readOnly = true)
    public List<VisitanteDTO> findByNomeIgnoreCaseContaining(String nome) {
        return repository.findByNomeIgnoreCaseContaining(nome).stream()
                         .map(VisitanteDTO::new)
                         .collect(Collectors.toList());
    }

    private void copyDtoToEntity(VisitanteDTO dto, Visitante entity) {
        entity.setNome(dto.getNome());
        entity.setSobrenome(dto.getSobrenome());
        entity.setDataNascimento(dto.getDataNascimento());
        entity.setEmail(dto.getEmail());
        entity.setTelefone(dto.getTelefone());
        entity.setOpcaoCurso(dto.getOpcaoCurso());
        entity.setApostila(dto.getApostila());

        if (dto.getCursoId() != null) {
            entity.setCurso(findCursoById(dto.getCursoId()));
        }

        if (dto.getEbdCursoId() != null) {
            entity.setEbdCursoVisitante(findEbdCursoById(dto.getEbdCursoId()));
        }
    }

    private Curso findCursoById(Long id) {
        return cursoRepository.findById(id)
                              .orElseThrow(() -> new EntityNotFoundException("Curso não encontrado"));
    }

    private EBDCurso findEbdCursoById(Long id) {
        return ebdCursoRepository.findById(id)
                                  .orElseThrow(() -> new EntityNotFoundException("EBDCurso não encontrado"));
    }
}
