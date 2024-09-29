package com.esibape.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

	
}
