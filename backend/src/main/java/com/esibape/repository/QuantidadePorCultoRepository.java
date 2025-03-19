package com.esibape.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.QuantidadePorCulto;
import com.esibape.entities.TipoCulto;

public interface QuantidadePorCultoRepository extends JpaRepository<QuantidadePorCulto, Long> {

	 @Query("SELECT q FROM QuantidadePorCulto q WHERE MONTH(q.data) = :mes")
	    List<QuantidadePorCulto> findByMes(@Param("mes") int mes);
	 
	 @Query("SELECT ROUND(AVG(q.total)) FROM QuantidadePorCulto q WHERE YEAR(q.data) = :ano AND q.TipoCulto = :tipoCulto")
	 Integer findMediaTotalByAnoAndTipoCulto(@Param("ano") int ano, @Param("tipoCulto") TipoCulto tipoCulto);


}
