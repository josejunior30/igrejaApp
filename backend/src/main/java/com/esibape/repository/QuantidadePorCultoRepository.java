package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.QuantidadePorCulto;

public interface QuantidadePorCultoRepository extends JpaRepository<QuantidadePorCulto, Long> {

	 @Query("SELECT q FROM QuantidadePorCulto q WHERE MONTH(q.data) = :mes")
	    List<QuantidadePorCulto> findByMes(@Param("mes") int mes);
	  
}
