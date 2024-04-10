package com.esibape.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.FileStorage;

public interface FileStorageRepository extends JpaRepository<FileStorage,Long> {

}
