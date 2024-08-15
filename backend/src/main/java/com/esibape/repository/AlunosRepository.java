package com.esibape.repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esibape.entities.Alunos;

public interface AlunosRepository extends JpaRepository<Alunos, Long> {

    // Busca alunos por nome, considerando apenas os ativos
    List<Alunos> findByNomeIgnoreCaseContainingAndAtivoTrue(String nome);
    
    // Busca alunos por horário, considerando apenas os ativos
    List<Alunos> findByHorarioAndAtivoTrue(LocalTime horario);
    
    // Busca alunos por ID do projeto, considerando apenas os ativos
    List<Alunos> findByProjetosIdAndAtivoTrue(Long projetoId);
    
    // Busca alunos por ID do projeto e horário, considerando apenas os ativos
    List<Alunos> findByProjetosIdAndHorarioAndAtivoTrue(Long projetoId, LocalTime horario);
    
    // Busca aluno por ID, considerando apenas os ativos
    Optional<Alunos> findByIdAndAtivoTrue(Long id);

	List<Alunos> findByAtivoTrue();
	List<Alunos> findAll();
	  
}
