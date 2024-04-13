package com.esibape.service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.esibape.Config.FileStorageProperties;
import com.esibape.entities.FileStorage;
import com.esibape.entities.Membro;
import com.esibape.repository.FileStorageRepository;
import com.esibape.repository.MembroRepository;

@Service
public class FileStorageService {
		@Autowired
	    private final FileStorageRepository repository;
	  	@Autowired
	    private MembroRepository membroRepository;
	  	@Value("${file.upload-dir}")
	    private String fileUploadDir;
	  
	  	private final Path fileStorageLocation;
	  
	    public FileStorageService(FileStorageProperties fileStorageProperties, FileStorageRepository repository) {
	        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
	                .toAbsolutePath().normalize();
	        this.repository = repository;
	    }

	    @Transactional
	    public ResponseEntity<String> uploadFile(MultipartFile file, Long membroId) {
	        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	        try {
	            Path targetLocation = fileStorageLocation.resolve(fileName);
	            file.transferTo(targetLocation);
	            String fileDownloadUri = fileUploadDir + "/" + fileName; 
	                   
	            // Encontrar o membro pelo ID
	            Membro membro = membroRepository.findById(membroId)
	                    .orElseThrow(() -> new IllegalArgumentException("Membro não encontrado com o ID fornecido: " + membroId));

	            // Salva a URL da imagem no banco de dados, associando ao membro
	            FileStorage fileStorage = new FileStorage(fileName, fileDownloadUri, membro);
	            repository.save(fileStorage);

	            // Retorna a URL da imagem na resposta
	            return ResponseEntity.ok(fileDownloadUri);
	        } catch (IOException e) {
	            e.printStackTrace();
	            return ResponseEntity.badRequest().build();
	        }
	    }

	    @Transactional(readOnly = true)
	    public ResponseEntity<String> getImageUrlByMembroId(Long membroId) {
	        try {
	            // Encontra o arquivo associado ao membro pelo ID do membro
	            Optional<FileStorage> fileStorageOptional = repository.findById(membroId);
	            
	            if (fileStorageOptional.isPresent()) {
	                // Se o arquivo for encontrado, retorna sua URL de download
	                String imageUrl = fileStorageOptional.get().getFileDownloadUri();
	                return ResponseEntity.ok(imageUrl);
	            } else {
	                // Se o arquivo não for encontrado, retorna uma mensagem de erro
	                return ResponseEntity.notFound().build();
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.badRequest().build();
	        }
	    }
	
	}
  
