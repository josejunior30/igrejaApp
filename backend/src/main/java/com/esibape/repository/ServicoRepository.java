package com.esibape.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

	List<Servico> findByOrdemServicoId(Long id);



}
