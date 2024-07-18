package com.esibape.service;


import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.AlunoStatusDTO;
import com.esibape.DTO.AlunosDTO;
import com.esibape.DTO.ChamadaDTO;

import com.esibape.DTO.ProjetosDTO;
import com.esibape.entities.AlunoStatus;
import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;

import com.esibape.entities.Projetos;
import com.esibape.repository.AlunoStatusRepository;
import com.esibape.repository.AlunosRepository;
import com.esibape.repository.ChamadaRepository;
import com.esibape.repository.ProjetosRepository;

@Service
public class AlunosService {
	@Autowired
	private AlunosRepository repository;
	@Autowired
	private ProjetosRepository projetosRepository;
	@Autowired
	private ChamadaRepository chamadaRepository;
	@Autowired
	private AlunoStatusRepository alunoStatusRepository;
	
	
	@Transactional(readOnly = true)
	    public List<AlunosDTO> findAll() {
	        List<Alunos> list = repository.findAll();
	        
	        return  list.stream()
		               .map(x -> new AlunosDTO(x, x.getProjetos(), x.getAlunoStatus(), x.getChamada() ))
		               .collect(Collectors.toList());
	    }
	  @Transactional(readOnly = true)
	    public AlunosDTO findById(Long id) {
	    	Optional<Alunos> alunos = repository.findById(id);
	    	Alunos entity = alunos.get();
	    	return  new AlunosDTO(entity, entity.getProjetos(), entity.getAlunoStatus(), entity.getChamada()) ;
	    }
	  
	  @Transactional
	    public AlunosDTO insert( AlunosDTO dto) {
	    		Alunos entity =  new Alunos();
	    		copyDtoToEntity(dto, entity);
	    		
	    		entity = repository.save(entity);
	    		return new AlunosDTO(entity);
	    	
	    }
	  
	    @Transactional
	    public AlunosDTO update(Long id, AlunosDTO dto) {
	    	Alunos entity=repository.getReferenceById(id);
	    	copyDtoToEntity(dto, entity);
	    	entity = repository.save(entity);
			return new AlunosDTO(entity);
	    }
	    
	    public void delete(Long id) {
	    	repository.deleteById(id);
	 
	    } 
	    
	    @Transactional(readOnly = true)
		public List<AlunosDTO> findByNomeIgnoreCaseContaining(String nome) {
			List<Alunos> result = repository.findByNomeIgnoreCaseContaining(nome);
			 return  result.stream().map(x -> new AlunosDTO(x)).toList();
			
		}
	    @Transactional(readOnly = true)
	    public List<AlunosDTO> findByHorario(LocalTime horario) {
	        List<Alunos> result = repository.findByHorario(horario);
	        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
	    }
	    @Transactional(readOnly = true)
	    public List<AlunosDTO> findByProjetoId(Long projetoId) {
	        List<Alunos> result = repository.findByProjetosId(projetoId);
	        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
	    }

	    @Transactional(readOnly = true)
	    public List<AlunosDTO> findByProjetoIdAndHorario(Long projetoId, LocalTime horario) {
	        List<Alunos> result = repository.findByProjetosIdAndHorario(projetoId, horario);
	        return result.stream().map(x -> new AlunosDTO(x)).collect(Collectors.toList());
	    }
	    
	    private void copyDtoToEntity(AlunosDTO dto, Alunos entity) {
	        atualizarIdade(dto);
	        // Atributos básicos
	        entity.setNome(dto.getNome());
	        entity.setDataNascimento(dto.getDataNascimento());
	        entity.setIdade(dto.getIdade());
	        entity.setEmail(dto.getEmail());
	        entity.setResponsavel(dto.getResponsavel());
	        entity.setRg(dto.getRg());
	        entity.setCpfResponsavel(dto.getCpfResponsavel());
	        entity.setBairro(dto.getBairro());
	        entity.setCep(dto.getCep());
	        entity.setCidade(dto.getCidade());
	        entity.setComplemento(dto.getComplemento());
	        entity.setNumero(dto.getNumero());
	        entity.setTelefone(dto.getTelefone());
	        entity.setUrl(dto.getUrl());
	        entity.setRua(dto.getRua());
	        entity.setAlunoDoenca(dto.getAlunoDoenca());
	        entity.setSangue(dto.getSangue());
	        entity.setHorario(dto.getHorario());
	        entity.setPergunta(dto.getPergunta());

	        // Configuração de Projetos
	        ProjetosDTO pgDTO = dto.getProjetos();
	        Projetos projetos = projetosRepository.getReferenceById(pgDTO.getId());
	        entity.setProjetos(projetos);

	        // Configuração de Chamada
	        List<ChamadaDTO> chaDTO = dto.getChamada();
	        List<Chamada> chamada = chaDTO.stream()
	                .map(chamadaDto -> chamadaRepository.getReferenceById(chamadaDto.getId()))
	                .collect(Collectors.toList());
	        entity.setChamada(chamada);

	        // Configuração de AlunoStatus
	        if (dto.getAlunoStatus() != null) {
	            AlunoStatusDTO aluDTO = dto.getAlunoStatus();
	            AlunoStatus alunoStatus = alunoStatusRepository.getReferenceById(aluDTO.getId());
	            entity.setAlunoStatus(alunoStatus);
	        } else {
	            entity.setAlunoStatus(null); // Permite que alunoStatus seja nulo na entidade
	        }
	    }

	   public void atualizarIdade(AlunosDTO dto) {
	        LocalDate dataNascimento = dto.getDataNascimento();
	        Integer idadeAtual = dto.getIdade(); 
	        
	        // Calcula a idade apenas se a idade estiver vazia
	        if (dataNascimento != null && idadeAtual == null) {
	            LocalDate dataAtual = LocalDate.now();
	            Period periodo = Period.between(dataNascimento, dataAtual);
	            dto.setIdade(periodo.getYears());
	        }
	   }
}
