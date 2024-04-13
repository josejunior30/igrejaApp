package com.esibape.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.esibape.service.FileStorageService;

@RestController
@RequestMapping(value="api/files")
public class FileStorageController {
	@Autowired
	private FileStorageService fileStorageService;

	
	@PostMapping(value= "/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("membroId") Long membroId) {
        return fileStorageService.uploadFile(file, membroId);
    }
	
	// Endpoint para obter a URL da imagem associada a um membro pelo ID do membro
    @GetMapping(value= "/image/{membroId}")
    public ResponseEntity<String> getImageUrlByMembroId(@PathVariable Long membroId) {
        return fileStorageService.getImageUrlByMembroId(membroId);
    }
}