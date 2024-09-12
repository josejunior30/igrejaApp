package com.esibape.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.ChamadaDTO;
import com.esibape.DTO.ProjetosDTO;
import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;
import com.esibape.entities.ChamadaAluno;
import com.esibape.entities.Projetos;
import com.esibape.repository.AlunosRepository;
import com.esibape.repository.ChamadaRepository;
import com.esibape.repository.ProjetosRepository;

@Service
public class ChamadaService {
	@Autowired
	private ChamadaRepository repository;
	
	@Autowired
	private AlunosRepository alunosRepository;
	
	@Autowired
	private ProjetosRepository projetosrepository;
	
	@Transactional(readOnly = true)
	public List<ChamadaDTO> findAll() {
		List <Chamada> entity = repository.findAll();
		return  entity.stream()
	               .map(x -> new ChamadaDTO(x, x.getAlunos(), x.getProjetosChamada()))
	               .collect(Collectors.toList());
	}
	
	 @Transactional(readOnly = true)
	    public ChamadaDTO findById(Long id) {
	    	Optional<Chamada> chamada = repository.findById(id);
	    	Chamada entity = chamada.get();
	    	return  new ChamadaDTO(entity, entity.getAlunos(), entity.getProjetosChamada()) ;
	    }
	 
	 @Transactional(readOnly = true)
	 public List<ChamadaDTO> findAll(LocalDate data) {
	     List<Chamada> chamadas = repository.findByData(data);
	     
	     List<ChamadaDTO> chamadasDTO = new ArrayList<>();
	     for (Chamada chamada : chamadas) {
	         ChamadaDTO chamadaDTO = new ChamadaDTO(chamada, chamada.getAlunos(), chamada.getProjetosChamada());
	         chamadasDTO.add(chamadaDTO);
	     }
	     
	     return chamadasDTO;
	 }
	 
	 

	 @Transactional(readOnly = true)
	    public List<ChamadaDTO> findByDataAndProjeto(LocalDate data, Long projetoId) {
	        List<Chamada> chamadas = repository.findByDataAndProjeto(data, projetoId);

	        return mapToDTOList(chamadas);
	    }
	 @Transactional(readOnly = true)
	    private List<ChamadaDTO> mapToDTOList(List<Chamada> chamadas) {
	        return chamadas.stream()
	                .map(chamada -> new ChamadaDTO(chamada, chamada.getAlunos(), chamada.getProjetosChamada()))
	                .collect(Collectors.toList());
	    }
	    
	    @Transactional
	    public ChamadaDTO insert(ChamadaDTO dto){
		 Chamada entity = new Chamada();
		 copyDtoToEntity(dto, entity);
		 entity = repository.save(entity);
		 verificarAusenciasConsecutivas(entity.getAlunos());
	    	return new ChamadaDTO(entity);
	    	
	    }
	    public void verificarAusenciasConsecutivas(Alunos aluno) {
	        // Busca as três últimas chamadas do aluno
	        List<Chamada> ultimasChamadas = repository.findTop3ByAlunosOrderByDataDesc(aluno);

	        // Adiciona um log para verificar as chamadas retornadas
	        System.out.println("Últimas Chamadas: ");
	        for (Chamada chamada : ultimasChamadas) {
	            System.out.println("ID: " + chamada.getId() + ", Data: " + chamada.getData() + ", Status: " + chamada.getChamadaAluno());
	        }

	        // Verifica se as três últimas chamadas são "AUSENTE"
	        boolean tresAusenciasSeguidas = ultimasChamadas.stream()
	            .allMatch(chamada -> chamada.getChamadaAluno() == ChamadaAluno.AUSENTE);

	        // Log do estado atual do aluno antes da atualização
	        System.out.println("Estado atual do aluno antes da atualização: abandono = " + aluno.isAbandono());

	        if (tresAusenciasSeguidas) {
	            // Atualiza o campo 'abandono' para true se houver três ausências seguidas
	            aluno.setAbandono(true);
	            alunosRepository.save(aluno);
	            System.out.println("Campo 'abandono' atualizado para true.");
	        } else if (!ultimasChamadas.isEmpty() && ultimasChamadas.get(0).getChamadaAluno() == ChamadaAluno.PRESENTE) {
	            // Se a última chamada for 'PRESENTE', reverte o campo 'abandono' para false
	            aluno.setAbandono(false);
	            alunosRepository.save(aluno);
	            System.out.println("Campo 'abandono' revertido para false.");
	        } else {
	            // Nenhuma atualização
	            System.out.println("Campo 'abandono' não foi alterado.");
	        }
	    }


	    private void copyDtoToEntity(ChamadaDTO dto, Chamada entity) {
			entity.setData(dto.getData());
			entity.setChamadaAluno(dto.getChamadaAluno());
			AlunosDTO AlDTO = dto.getAlunos();
			Alunos alunos = alunosRepository.getReferenceById(AlDTO.getId());
			entity.setAlunos(alunos);
			ProjetosDTO pjDTO = dto.getProjetosChamada();
			Projetos projetos = projetosrepository.getReferenceById(pjDTO.getId());
			entity.setProjetosChamada(projetos);
	  
	    }
			
}
