package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.Membro;

public interface MembroRepository extends JpaRepository<Membro, Long> {

	List<Membro> findByNomeIgnoreCaseContaining(String nome);
	
	 @Query("SELECT m FROM Membro m INNER JOIN m.pequenoGrupo pg WHERE UPPER(pg.apelido) LIKE UPPER(CONCAT('%', :apelido, '%'))")
	 List<Membro> findByPequenoGrupo_Apelido(@Param("apelido") String apelido);
	
}
