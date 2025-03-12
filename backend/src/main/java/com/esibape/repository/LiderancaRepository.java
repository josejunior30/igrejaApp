package com.esibape.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.Cargo;
import com.esibape.entities.Lideranca;


public interface LiderancaRepository extends JpaRepository<Lideranca, Long> {

	 Optional<Lideranca> findByCargo(Cargo cargo);

}
