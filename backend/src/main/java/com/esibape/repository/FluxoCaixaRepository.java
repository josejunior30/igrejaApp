package com.esibape.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.FluxoCaixa;


public interface FluxoCaixaRepository extends JpaRepository<FluxoCaixa, Long >{
	@Query("SELECT f FROM FluxoCaixa f WHERE f.mes = :mes AND f.ano = :ano")
	FluxoCaixa findByMesAndAno(@Param("mes") Integer mes, @Param("ano") Integer ano);

}
