package com.esibape.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.esibape.entities.DescricaoConta;
import com.esibape.entities.DescricaoReceita;



public interface DescricaoReceitaRepository extends JpaRepository<DescricaoReceita, Long >{

	  Optional<DescricaoReceita> findByDescricao(String descricao);
}
