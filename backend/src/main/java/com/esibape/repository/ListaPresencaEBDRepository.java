package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.ListaPresencaEBD;

public interface ListaPresencaEBDRepository extends JpaRepository<ListaPresencaEBD, Long>{
	@Query("SELECT l FROM ListaPresencaEBD l " +
		       "WHERE l.curso.id = :cursoId " +
		       "AND FUNCTION('MONTH', l.data) = :month " +
		       "AND FUNCTION('YEAR', l.data) = :year")
		List<ListaPresencaEBD> findByCursoAndMonth(@Param("cursoId") Long cursoId, @Param("month") int month, @Param("year") int year);
}
