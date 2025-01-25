package com.esibape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.EbdEstudos;

public interface EbdEstudosRepository extends JpaRepository<EbdEstudos, Long> {
	@Query("SELECT e FROM EbdEstudos e JOIN FETCH e.ebdCurso WHERE e.ebdCurso.id = :cursoId")
	Optional<EbdEstudos> findByCursoId(@Param("cursoId") Long cursoId);


}