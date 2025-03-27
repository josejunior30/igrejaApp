package com.esibape.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.esibape.entities.ContaPagar;
import com.esibape.entities.RequerimentoOrçamento;
import com.esibape.entities.StatusPagamento;


@Repository
public interface ContaPagarRepository extends JpaRepository<ContaPagar, Long> {
    
    @Query("SELECT c FROM ContaPagar c WHERE " +
           "LOWER(c.descricaoConta.descricao) LIKE LOWER(CONCAT('%', :descricaoConta, '%')) " + 
           "AND c.status = :status " +
           "AND c.dataVencimento BETWEEN :inicio AND :fim")
    List<ContaPagar> findByDescricaoContaAproximada(
        @Param("descricaoConta") String descricaoConta,
        @Param("status") StatusPagamento status,
        @Param("inicio") LocalDate inicio,
        @Param("fim") LocalDate fim
    );

    List<ContaPagar> findByDataCriacaoBetween(LocalDateTime inicio, LocalDateTime fim);


	Optional<RequerimentoOrçamento> findByDescricao(String string);


}