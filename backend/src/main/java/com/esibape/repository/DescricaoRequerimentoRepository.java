package com.esibape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.esibape.entities.DescricaoRequerimento;



public interface DescricaoRequerimentoRepository extends JpaRepository<DescricaoRequerimento, Long >{

	  Optional<DescricaoRequerimento> findByDescricao(String descricao);
}
