package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esibape.DTO.EbdCursoDTO;
import com.esibape.entities.EbdCurso;
import com.esibape.repository.EbdCursoRepository;

@Service
public class EbdCursoService {

    @Autowired
    private EbdCursoRepository ebdCursoRepository;

    // Criar um novo EbdCurso
    public EbdCursoDTO createEbdCurso(EbdCursoDTO ebdCursoDTO, byte[] pdfDeEstudo) {
        EbdCurso ebdCurso = new EbdCurso();
        ebdCurso.setNome(ebdCursoDTO.getNome());
        ebdCurso.setPdfDeEstudo(ebdCursoDTO.getPdfDeEstudo());

        EbdCurso savedEbdCurso = ebdCursoRepository.save(ebdCurso);
        return new EbdCursoDTO(savedEbdCurso.getId(), savedEbdCurso.getNome(), savedEbdCurso.getPdfDeEstudo());
    }

    // Obter todos os EbdCursos
    public List<EbdCursoDTO> findAllEbdCursos() {
        List<EbdCurso> ebdCursos = ebdCursoRepository.findAll();
        return ebdCursos.stream()
                .map(curso -> new EbdCursoDTO(curso.getId(), curso.getNome(), curso.getPdfDeEstudo()))
                .collect(Collectors.toList());
    }

    // Obter um EbdCurso pelo ID
    public EbdCursoDTO findByEbdCurso(Long id) {
        Optional<EbdCurso> ebdCurso = ebdCursoRepository.findById(id);
        if (ebdCurso.isEmpty()) {
            throw new RuntimeException("EbdCurso não encontrado.");
        }
        return new EbdCursoDTO(ebdCurso.get().getId(), ebdCurso.get().getNome(), ebdCurso.get().getPdfDeEstudo());
    }


    // Deletar um EbdCurso
    public void deleteEbdCurso(Long id) {
        ebdCursoRepository.deleteById(id);
    }
    public byte[] downloadPdf(Long id) {
        Optional<EbdCurso> optionalEbdCurso = ebdCursoRepository.findById(id);
        if (optionalEbdCurso.isEmpty()) {
            throw new RuntimeException("EbdCurso não encontrado.");
        }

        byte[] pdf = optionalEbdCurso.get().getPdfDeEstudo();
        if (pdf == null || pdf.length == 0) {
            throw new RuntimeException("PDF não encontrado para este curso.");
        }

        return pdf;
    }
}