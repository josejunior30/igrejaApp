package com.esibape.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.esibape.entities.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

 
}