package com.esibape.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.esibape.entities.Alunos;
import com.esibape.entities.FormaPagamento;
import com.esibape.entities.MesReferencia;
import com.esibape.entities.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long>{

	
	 @Query("SELECT SUM(p.valor) FROM Pagamento p WHERE p.mesReferencia = :mesReferencia")
	    Integer sumValoresByMesReferencia(@Param("mesReferencia") MesReferencia mesReferencia);

	    @Query("SELECT p FROM Pagamento p WHERE p.mesReferencia = :mesReferencia")
	    List<Pagamento> findByMesReferencia(@Param("mesReferencia") MesReferencia mesReferencia);

	    List<Pagamento> findByAlunosPG(Alunos aluno);
	    
	   
	
	    @Query("SELECT SUM(p.valor) FROM Pagamento p WHERE p.formaPagamento = :formaPagamento AND p.mesReferencia = :mesReferencia")
	    Integer sumValoresByFormaPagamentoAndMesReferencia(@Param("formaPagamento") FormaPagamento formaPagamento, @Param("mesReferencia") MesReferencia mesReferencia);
	    


}

