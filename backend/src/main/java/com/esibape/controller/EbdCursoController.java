package com.esibape.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.esibape.DTO.EbdCursoDTO;
import com.esibape.service.EbdCursoService;

@RestController
@RequestMapping("/ebd-cursos")
public class EbdCursoController {

    @Autowired
    private EbdCursoService ebdCursoService;

    @PostMapping
    public ResponseEntity<EbdCursoDTO> createEbdCurso(@RequestParam String nome,
                                                      @RequestParam MultipartFile pdfDeEstudo) {
        if (nome == null || nome.isBlank()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (pdfDeEstudo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            EbdCursoDTO ebdCurso = ebdCursoService.createEbdCurso(new EbdCursoDTO(null, nome, null), pdfDeEstudo.getBytes());
            return new ResponseEntity<>(ebdCurso, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EbdCursoDTO> getEbdCursoById(@PathVariable Long id) {
        EbdCursoDTO ebdCurso = ebdCursoService.findByEbdCurso(id);
        return new ResponseEntity<>(ebdCurso, HttpStatus.OK);
    }
    @GetMapping("/{id}/download-pdf")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        try {
            byte[] pdf = ebdCursoService.downloadPdf(id);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=ebd_curso_" + id + ".pdf");
            headers.add("Content-Type", "application/pdf");

            return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping
    public ResponseEntity<List<EbdCursoDTO>> getAllEbdCursos() {
        List<EbdCursoDTO> ebdCursos = ebdCursoService.findAllEbdCursos();
        return new ResponseEntity<>(ebdCursos, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEbdCurso(@PathVariable Long id) {
        ebdCursoService.deleteEbdCurso(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}