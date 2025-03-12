package com.esibape.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.esibape.entities.ContaPagar;
import com.esibape.entities.StatusPagamento;


@Repository
public interface ContaPagarRepository extends JpaRepository<ContaPagar, Long> {

	List<ContaPagar> findByDescricaoContainingIgnoreCaseAndStatusAndDataVencimentoBetween(
	        String descricao, StatusPagamento status, LocalDate inicio, LocalDate fim);

	
	List<ContaPagar> findByDataCriacaoBetween(LocalDateTime inicio, LocalDateTime fim);


}