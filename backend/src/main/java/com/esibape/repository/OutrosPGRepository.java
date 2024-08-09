package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.MesReferencia;
import com.esibape.entities.OutrosPG;


public interface OutrosPGRepository extends JpaRepository<OutrosPG, Long>{
	 
	@Query("SELECT p FROM OutrosPG p WHERE p.mesReferencia = :mesReferencia")
	    List<OutrosPG> findByMesReferencia(@Param("mesReferencia") MesReferencia mesReferencia);

}
