package com.esibape.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.esibape.entities.Visitante;

public interface VisitanteRepository extends JpaRepository<Visitante, Long >{
	List<Visitante> findByNomeIgnoreCaseContaining(String nome);
}
