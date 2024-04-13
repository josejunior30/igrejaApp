package com.esibape.DTO;

import com.esibape.entities.FileStorage;
import com.esibape.entities.Membro;

public class FileStorageDTO {
    private Long id;
    private String fileName;
    private String fileDownloadUri;
    private MembroDTO membro;

    public FileStorageDTO() {
    }

    public FileStorageDTO(Long id, String fileName, String fileDownloadUri, MembroDTO membro) {
        this.id = id;
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
        this.membro=membro;
    }


    public FileStorageDTO(FileStorage entity) {
        this.id = entity.getId();
        this.fileName = entity.getFileName();
        this.fileDownloadUri = entity.getFileDownloadUri();
      
    }
    public FileStorageDTO(FileStorage entity, Membro membro ) {
    	this(entity);
    	this.membro = new MembroDTO(membro);
      
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileDownloadUri() {
        return fileDownloadUri;
    }

    public void setFileDownloadUri(String fileDownloadUri) {
        this.fileDownloadUri = fileDownloadUri;
    }

	public MembroDTO getMembro() {
		return membro;
	}

	public void setMembro(MembroDTO membro) {
		this.membro = membro;
	}

    
}
