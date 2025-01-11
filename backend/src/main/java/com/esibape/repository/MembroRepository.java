package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.Membro;

public interface MembroRepository extends JpaRepository<Membro, Long> {

	
	    List<Membro> findByNomeIgnoreCaseContaining(String nome);

	    // Método para buscar membros pelo mês de nascimento
	    @Query("SELECT m FROM Membro m WHERE MONTH(m.dataNascimento) = :mes")
	    List<Membro> findByMonthOfBirth(@Param("mes") int mes);
	
	
}
