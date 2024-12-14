package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esibape.DTO.EbdEstudosDTO;
import com.esibape.entities.EBDCurso;
import com.esibape.entities.EbdEstudos;
import com.esibape.repository.EBDCursoRepository;
import com.esibape.repository.EbdEstudosRepository;

@Service
public class EbdEstudosService {

    @Autowired
    private EbdEstudosRepository ebdEstudoRepository;
    @Autowired
    private EBDCursoRepository ebdCursoRepository;
    // Criar um novo EbdCurso
    public EbdEstudosDTO createEbdEstudo(String nome, byte[] pdfDeEstudo, Long cursoId) {
        // Validações
        if (cursoId == null) {
            throw new IllegalArgumentException("O curso associado é obrigatório.");
        }

        // Buscar curso no repositório
        EBDCurso ebdCurso = ebdCursoRepository.findById(cursoId)
            .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado com o ID especificado."));

        // Criar e configurar a entidade
        EbdEstudos ebdEstudos = new EbdEstudos();
        ebdEstudos.setNome(nome);
        ebdEstudos.setPdfDeEstudo(pdfDeEstudo);
        ebdEstudos.setEbdCurso(ebdCurso);

        // Salvar no banco
        EbdEstudos savedEbdEstudo = ebdEstudoRepository.save(ebdEstudos);

        // Retornar DTO
        return new EbdEstudosDTO(savedEbdEstudo.getId(), savedEbdEstudo.getNome(),
                savedEbdEstudo.getPdfDeEstudo(), savedEbdEstudo.getEbdCurso());
    }

    // Obter todos os EbdCursos
    public List<EbdEstudosDTO> findAllEbdCursos() {
        List<EbdEstudos> ebdCursos = ebdEstudoRepository.findAll();
        return ebdCursos.stream()
                .map(estudo -> new EbdEstudosDTO(estudo.getId(), estudo.getNome(), estudo.getPdfDeEstudo(), estudo.getEbdCurso()))
                .collect(Collectors.toList());
    }

    // Obter um EbdCurso pelo ID
    public EbdEstudosDTO findByEbdCurso(Long id) {
        Optional<EbdEstudos> ebdEstudo = ebdEstudoRepository.findById(id);
        if (ebdEstudo.isEmpty()) {
            throw new RuntimeException("EbdCurso não encontrado.");
        }
        return new EbdEstudosDTO(ebdEstudo.get().getId(), ebdEstudo.get().getNome(), ebdEstudo.get().getPdfDeEstudo(),ebdEstudo.get().getEbdCurso());
    }


    // Deletar um EbdCurso
    public void deleteEbdCurso(Long id) {
    	ebdEstudoRepository.deleteById(id);
    }
    
    public byte[] downloadPdf(Long id) {
        Optional<EbdEstudos> optionalEbdCurso = ebdEstudoRepository.findById(id);
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