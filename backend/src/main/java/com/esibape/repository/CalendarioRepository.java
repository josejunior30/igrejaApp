package com.esibape.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.esibape.entities.Calendario;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CalendarioRepository extends JpaRepository<Calendario, Long> {
    
    // 🔍 Buscar por título dentro do ano atual
    List<Calendario> findByTituloContainingIgnoreCaseAndDataBetween(
        String titulo, LocalDate inicioAno, LocalDate fimAno
    );

    // 🔍 Buscar por responsável dentro do ano atual
    List<Calendario> findByResponsavelContainingIgnoreCaseAndDataBetween(
        String responsavel, LocalDate inicioAno, LocalDate fimAno
    );

	List<Calendario> findByDataBetween(LocalDate inicioAno, LocalDate fimAno);
}

