package com.esibape.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.Chamada;
import com.esibape.entities.Projetos;

import java.time.LocalDate;
import java.util.List;

public interface ChamadaRepository extends JpaRepository<Chamada, Long> {

    @Query(value = "SELECT * FROM tb_lista_presenca WHERE data = :data", nativeQuery = true)
    List<Chamada> findByData(@Param("data") LocalDate data);

    @Query(value = "SELECT c FROM Chamada c WHERE c.data = :data AND c.projetosChamada = :projeto")
    List<Chamada> findByDataAndProjeto(@Param("data") LocalDate data, @Param("projeto") Projetos projeto);
}