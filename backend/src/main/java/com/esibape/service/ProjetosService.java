package com.esibape.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.ProjetosDTO;
import com.esibape.entities.Alunos;
import com.esibape.entities.Projetos;
import com.esibape.repository.ProjetosRepository;



@Service
public class ProjetosService {
	@Autowired
	private ProjetosRepository repository;
	
	

    @Transactional(readOnly = true)
    public List<ProjetosDTO> findAll() {
        List<Projetos> entity = repository.findAll();
        return entity.stream()
                .map(x -> {
                    // Filtrar alunos ativos
                    List<Alunos> alunosAtivos = x.getAlunos().stream()
                            .filter(aluno -> aluno.isAtivo()) // Supondo que existe um método isAtivo()
                            .collect(Collectors.toList());

                    return new ProjetosDTO(x, alunosAtivos, x.getChamada(), x.getRelatorio());
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjetosDTO findById(Long id) {
        Optional<Projetos> projetos = repository.findById(id);
        Projetos entity = projetos.get();
        // Filtrar alunos ativos
        List<Alunos> alunosAtivos = entity.getAlunos().stream()
                .filter(aluno -> aluno.isAtivo()) // Supondo que existe um método isAtivo()
                .collect(Collectors.toList());
                
        return new ProjetosDTO(entity, alunosAtivos, entity.getChamada(), entity.getRelatorio());
    }
	
	@Transactional
    public ProjetosDTO insert( ProjetosDTO dto) {
    	Projetos entity = new Projetos();	
	        copyDtoToEntity(dto, entity);
	        entity = repository.save(entity);
	        return new ProjetosDTO(entity);
	}
    
	@Transactional
	public ProjetosDTO update(Long id, ProjetosDTO dto) {
		Projetos entity = repository.getReferenceById(id);
		copyDtoToEntity(dto, entity);
		repository.save(entity);
		return new ProjetosDTO(entity);
	}
	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	 
	   }
	   
	private void copyDtoToEntity(ProjetosDTO dto, Projetos entity) {
		entity.setNome(dto.getNome());
		entity.setLider(dto.getLider());
		entity.setCoordenador(dto.getCoordenador());
		entity.setFoto_coordenador(dto.getFoto_coordenador());
		entity.setFoto_lider(dto.getFoto_lider());
		entity.setFoto_fundo(dto.getFoto_fundo());
	}

	
}
