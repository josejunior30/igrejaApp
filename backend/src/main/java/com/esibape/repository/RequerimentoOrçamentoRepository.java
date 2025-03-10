package com.esibape.repository;



import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.RequerimentoOrçamento;

public interface RequerimentoOrçamentoRepository extends JpaRepository<RequerimentoOrçamento, Long>{
	List<RequerimentoOrçamento> findByDataRequerimentoBetween(LocalDate startDate, LocalDate endDate);

	
}
