package com.esibape.entities;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
	   String uploadFile(MultipartFile file);
	    void deleteFile(String fileUrl);
}
