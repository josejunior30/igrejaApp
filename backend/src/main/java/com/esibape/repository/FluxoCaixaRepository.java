package com.esibape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.FluxoCaixa;


public interface FluxoCaixaRepository extends JpaRepository<FluxoCaixa, Long >{
	Optional<FluxoCaixa> findByMesAndAno(Integer mes, Integer ano);

}
