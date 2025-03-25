package com.esibape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.esibape.entities.DescricaoConta;



public interface DescricaoContaRepository extends JpaRepository<DescricaoConta, Long >{

	  Optional<DescricaoConta> findByDescricao(String descricao);
}
