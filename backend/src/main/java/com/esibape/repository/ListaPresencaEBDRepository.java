package com.esibape.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.esibape.entities.ListaPresencaEBD;


public interface ListaPresencaEBDRepository extends JpaRepository<ListaPresencaEBD, Long>{


	 @Query("SELECT l FROM ListaPresencaEBD l " +
	           "WHERE FUNCTION('YEAR', l.data) = :year " +
	           "AND FUNCTION('MONTH', l.data) = :month " +
	           "AND l.curso.id = :cursoId")
	    List<ListaPresencaEBD> findByMonthAndCurso(
	            @Param("year") int year,
	            @Param("month") int month,
	            @Param("cursoId") Long cursoId);

	    @Query("SELECT l.chamadaMembro FROM ListaPresencaEBD l " +
	           "WHERE l.membro.id = :membroId " +
	           "AND FUNCTION('YEAR', l.data) = :year " +
	           "AND FUNCTION('MONTH', l.data) = :month")
	    List<String> findChamadaMembroByMembroAndMonth(
	            @Param("membroId") Long membroId,
	            @Param("year") int year,
	            @Param("month") int month);

}
