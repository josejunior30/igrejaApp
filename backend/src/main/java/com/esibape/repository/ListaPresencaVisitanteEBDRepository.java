package com.esibape.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.esibape.entities.ListaPresencaVisitanteEBD;
public interface ListaPresencaVisitanteEBDRepository extends JpaRepository<ListaPresencaVisitanteEBD, Long> {

  
    
    @Query("SELECT l FROM ListaPresencaEBD l " +
    	       "WHERE YEAR(l.data) = :year " +
    	       "AND MONTH(l.data) = :month " +
    	       "AND l.ebdCurso.id = :cursoId")
    	List<ListaPresencaVisitanteEBD> findByMonthAndCurso(
    	        @Param("year") int year,
    	        @Param("month") int month,
    	        @Param("cursoId") Long cursoId);

    @Query("SELECT l.chamadaVisitante FROM ListaPresencaVisitanteEBD l " +
           "WHERE l.visitante.id = :visitanteId " +
           "AND FUNCTION('YEAR', l.data) = :year " +
           "AND FUNCTION('MONTH', l.data) = :month")
    List<String> findChamadaVisitanteByVisitanteAndMonth(
            @Param("visitanteId") Long visitanteId,
            @Param("year") int year,
            @Param("month") int month);
}
