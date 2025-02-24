package com.esibape.repository;



import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.Transacao;


public interface TransacaoRepository extends JpaRepository<Transacao, Long >{
	
	 List<Transacao> findByIsReceita(Boolean isReceita);
	    List<Transacao> findByDataBetween(LocalDate inicio, LocalDate fim);
	    
	    @Query("SELECT t FROM Transacao t WHERE MONTH(t.data) = :mes AND YEAR(t.data) = :ano")
	    List<Transacao> findByMesEAno(@Param("mes") int mes, @Param("ano") int ano);

	    @Query("SELECT t FROM Transacao t WHERE YEAR(t.data) = :ano")
	    List<Transacao> findByAno(@Param("ano") int ano);
}
