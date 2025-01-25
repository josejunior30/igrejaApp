package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public EbdEstudosDTO createEbdEstudo(String nome, byte[] pdfDeEstudo, Long cursoId) {
        if (cursoId == null) {
            throw new IllegalArgumentException("O curso associado é obrigatório.");
        }

        EBDCurso ebdCurso = ebdCursoRepository.findById(cursoId)
            .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado com o ID especificado."));

        EbdEstudos ebdEstudos = new EbdEstudos();
        ebdEstudos.setNome(nome);
        ebdEstudos.setPdfDeEstudo(pdfDeEstudo);
        ebdEstudos.setEbdCurso(ebdCurso);

        EbdEstudos savedEbdEstudo = ebdEstudoRepository.save(ebdEstudos);

        return new EbdEstudosDTO(savedEbdEstudo.getId(), savedEbdEstudo.getNome(),
                 savedEbdEstudo.getEbdCurso().getId());  // Pegando apenas o ID
    }


	@Transactional(readOnly = true)
    public List<EbdEstudosDTO> findAll() {
        List<EbdEstudos> ebdCursos = ebdEstudoRepository.findAll();
        return ebdCursos.stream()
                .map(x -> new EbdEstudosDTO(x))
                .collect(Collectors.toList());
    }
	

    // Obter um EbdCurso pelo ID

	@Transactional(readOnly = true)
	public EbdEstudosDTO findByEbdCurso(Long id) {
	    EbdEstudos ebdEstudo = ebdEstudoRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("EbdCurso não encontrado."));
	    
	    return new EbdEstudosDTO(ebdEstudo.getId(), ebdEstudo.getNome(),
	             ebdEstudo.getEbdCurso().getId());  // Pegando apenas o ID
	}


    // Deletar um EbdEstudos
    public void deleteEbdEstudos(Long id) {
    	ebdEstudoRepository.deleteById(id);
    }
    
    public byte[] downloadPdfByCursoId(Long cursoId) {
        // Buscar o estudo associado ao curso diretamente
        EbdEstudos ebdEstudo = ebdEstudoRepository.findByCursoId(cursoId)
                .orElseThrow(() -> new RuntimeException("Estudo não encontrado para este curso."));

        byte[] pdf = ebdEstudo.getPdfDeEstudo();
        
        if (pdf == null || pdf.length == 0) {
            throw new RuntimeException("PDF não encontrado para este estudo.");
        }

        return pdf;
    }

}