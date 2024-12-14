package com.esibape.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.esibape.entities.EBDCurso;

@Repository
public interface EBDCursoRepository extends JpaRepository<EBDCurso, Long> {

 
}