package com.esibape.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.esibape.entities.CargoMembro;
@Repository
public interface CargoMembroRepository extends JpaRepository<CargoMembro, Long>{

}
