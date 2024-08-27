package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.esibape.entities.Membro;

public interface MembroRepository extends JpaRepository<Membro, Long> {

	List<Membro> findByNomeIgnoreCaseContaining(String nome);
	
}
