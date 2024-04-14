package com.esibape.service;


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
import com.esibape.entities.Projetos;
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
	
	
	@Transactional(readOnly = true)
	    public List<AlunosDTO> findAll() {
	        List<Alunos> list = repository.findAll();
	        
	        return  list.stream()
		               .map(x -> new AlunosDTO(x, x.getProjetos(), x.getChamada()))
		               .collect(Collectors.toList());
	    }
	  @Transactional(readOnly = true)
	    public AlunosDTO findById(Long id) {
	    	Optional<Alunos> alunos = repository.findById(id);
	    	Alunos entity = alunos.get();
	    	return  new AlunosDTO(entity, entity.getProjetos(), entity.getChamada()) ;
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
	    
	  
	   private void copyDtoToEntity(AlunosDTO dto, Alunos entity) {
			entity.setNome(dto.getNome());
			entity.setDataNascimento(dto.getDataNascimento());
			entity.setIdade(dto.getIdade());
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
			entity.setAlunoDoenca(dto.getAlunoDoenca());
			entity.setSangue(dto.getSangue());
			entity.setPergunta(dto.getPergunta());
			List<ChamadaDTO> chaDTO = dto.getChamada();
			List<Chamada> chamada = chaDTO.stream()
                    .map(chamadaDto -> chamadaRepository.getReferenceById(chamadaDto.getId()))
                    .collect(Collectors.toList());

			ProjetosDTO pgDTO = dto.getProjetos();
			Projetos projetos = projetosRepository.getReferenceById(pgDTO.getId());
			entity.setProjetos(projetos);
			entity.setChamada(chamada);
			
		}	
}
