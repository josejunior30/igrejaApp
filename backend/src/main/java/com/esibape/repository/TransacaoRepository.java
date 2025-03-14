package com.esibape.repository;



import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.Transacao;


public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    List<Transacao> findByIsReceita(Boolean isReceita);
    List<Transacao> findByDataBetween(LocalDate inicio, LocalDate fim);

    @Query("SELECT t FROM Transacao t WHERE MONTH(t.data) = :mes AND YEAR(t.data) = :ano")
    List<Transacao> findByMesEAno(@Param("mes") int mes, @Param("ano") int ano);

    @Query("SELECT t FROM Transacao t WHERE YEAR(t.data) = :ano")
    List<Transacao> findByAno(@Param("ano") int ano);

    @Query("SELECT t FROM Transacao t WHERE LOWER(t.descricao) LIKE LOWER(CONCAT('%', :descricao, '%'))")
    List<Transacao> buscarPorDescricao(@Param("descricao") String descricao);

    @Query("SELECT t FROM Transacao t WHERE LOWER(t.descricao) LIKE LOWER(CONCAT('%', :descricao, '%')) AND YEAR(t.data) = :ano")
    List<Transacao> buscarPorDescricaoEAno(@Param("descricao") String descricao, @Param("ano") int ano);

    @Query("SELECT t FROM Transacao t WHERE LOWER(t.descricao) LIKE LOWER(CONCAT('%', :descricao, '%')) AND MONTH(t.data) = :mes AND YEAR(t.data) = :ano")
    List<Transacao> buscarPorDescricaoMesEAno(@Param("descricao") String descricao, @Param("mes") int mes, @Param("ano") int ano);
    @Modifying
    @Query("DELETE FROM Transacao t WHERE t.descricao = :descricao")
    void deleteByDescricao(@Param("descricao") String descricao);


}
