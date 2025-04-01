package com.esibape.repository;


import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.Atendimento;



public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    @Query("SELECT a FROM Atendimento a WHERE YEAR(a.data) = :year")
    List<Atendimento> findByYear(@Param("year") int year);
    
    @Query("SELECT a FROM Atendimento a WHERE MONTH(a.data) = :mes AND YEAR(a.data) = :ano")
    List<Atendimento> findByMesEAno(@Param("mes") int mes, @Param("ano") int ano);
    
    
    @Query("SELECT a FROM Atendimento a WHERE a.data >= CURRENT_DATE ORDER BY a.data ASC")
    List<Atendimento> findProximosAtendimentos(Pageable pageable);

    @Query("SELECT a FROM Atendimento a WHERE a.data <= CURRENT_DATE ORDER BY a.data DESC")
    List<Atendimento> findUltimosAtendimentos(Pageable pageable);
    
    @Query("SELECT a FROM Atendimento a WHERE FUNCTION('YEAR', a.data) = :ano")
    List<Atendimento> findByAno(@Param("ano") int ano);
    
}
