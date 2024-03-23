package com.esibape.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.esibape.entities.Relatorio;

public interface RelatorioRepository extends JpaRepository<Relatorio, Long> {

    @Query(value = "SELECT * FROM tb_relatorio WHERE data = :data AND projeto_id = :projetoId", nativeQuery = true)
    List<Relatorio> findByDataAndProjeto(@Param("data") LocalDate data, @Param("projetoId") Long projetoId);

    @Query(value = "SELECT * FROM tb_relatorio WHERE projeto_id = :projetoId", nativeQuery = true)
    List<Relatorio> findByProjetoId(@Param("projetoId") Long projetoId);

}
