package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.Alunos;


public interface AlunosRepository extends JpaRepository<Alunos, Long>{
	
	List<Alunos> findByNomeIgnoreCaseContaining(String nome);
}
