package com.esibape.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.esibape.entities.ContaPagar;


@Repository
public interface ContaPagarRepository extends JpaRepository<ContaPagar, Long> {

 
}