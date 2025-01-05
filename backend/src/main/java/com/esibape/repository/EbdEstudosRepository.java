package com.esibape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.EBDCurso;
import com.esibape.entities.EbdEstudos;

public interface EbdEstudosRepository extends JpaRepository<EbdEstudos, Long> {
	
	 Optional<EbdEstudos> findByEbdCurso(EBDCurso ebdCurso);
}