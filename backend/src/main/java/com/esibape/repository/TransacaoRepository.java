package com.esibape.repository;



import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.Transacao;


public interface TransacaoRepository extends JpaRepository<Transacao, Long >{
	
	 List<Transacao> findByIsReceita(Boolean isReceita);
	    List<Transacao> findByDataBetween(LocalDate inicio, LocalDate fim);

}
