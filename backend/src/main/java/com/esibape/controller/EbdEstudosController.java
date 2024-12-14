package com.esibape.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.esibape.DTO.EbdEstudosDTO;
import com.esibape.service.EbdEstudosService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ebd-cursos")
public class EbdEstudosController {

    @Autowired
    private EbdEstudosService ebdEstudoService;

   
    @PostMapping
    public ResponseEntity<?> createEbdCurso(@RequestParam String nome,
                                            @RequestParam MultipartFile pdfDeEstudo,
                                            @RequestParam Long cursoId) {
        if (nome == null || nome.isBlank()) {
            return ResponseEntity.badRequest().body("O nome do estudo é obrigatório.");
        }
        if (pdfDeEstudo.isEmpty()) {
            return ResponseEntity.badRequest().body("O arquivo PDF é obrigatório.");
        }
        if (!pdfDeEstudo.getContentType().equals("application/pdf")) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("O arquivo deve ser um PDF.");
        }

        try {
            // Delegar toda a lógica para o serviço
            EbdEstudosDTO createdEbdCurso = ebdEstudoService.createEbdEstudo(nome, pdfDeEstudo.getBytes(), cursoId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEbdCurso);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar o arquivo.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<EbdEstudosDTO> getEbdCursoById(@PathVariable Long id) {
        EbdEstudosDTO ebdCurso = ebdEstudoService.findByEbdCurso(id);
        return new ResponseEntity<>(ebdCurso, HttpStatus.OK);
    }
    @GetMapping("/{id}/download-pdf")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        try {
            byte[] pdf = ebdEstudoService.downloadPdf(id);

            if (pdf == null || pdf.length == 0) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=ebd_curso_" + id + ".pdf");
            headers.add("Content-Type", "application/pdf");

            return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<EbdEstudosDTO>> getAllEbdCursos() {
        List<EbdEstudosDTO> ebdCursos = ebdEstudoService.findAllEbdCursos();
        return new ResponseEntity<>(ebdCursos, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEbdCurso(@PathVariable Long id) {
    	ebdEstudoService.deleteEbdCurso(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}