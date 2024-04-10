package com.esibape.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.esibape.Config.FileStorageProperties;

import com.esibape.entities.FileStorage;
import com.esibape.repository.FileStorageRepository;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

  
    @Autowired
    private final FileStorageRepository repository;
 
    private final Path fileStorageLocation;
  
    public FileStorageService(FileStorageProperties fileStorageProperties, FileStorageRepository repository) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        this.repository = repository;
    }

    @Transactional
    public ResponseEntity<String> uploadFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Path targetLocation = fileStorageLocation.resolve(fileName);
            file.transferTo(targetLocation);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("api/files/download")
                    .path(fileName)
                    .toUriString();
            // Salva a URL da imagem no banco de dados
            FileStorage fileStorage = new FileStorage(fileName, fileDownloadUri);
            
            repository.save(fileStorage);
            return ResponseEntity.ok("Upload completo. URL da imagem salva no banco de dados.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}