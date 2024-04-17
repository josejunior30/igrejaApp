package com.esibape.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.esibape.DTO.ProjetosDTO;
import com.esibape.DTO.RelatorioDTO;
import com.esibape.entities.Projetos;
import com.esibape.entities.Relatorio;
import com.esibape.repository.ProjetosRepository;
import com.esibape.repository.RelatorioRepository;

@Service	
public class RelatorioService {
	@Autowired
	private RelatorioRepository repository;
	@Autowired
	private ProjetosRepository projetosRepository;

	
	@Transactional(readOnly = true)
    public List<RelatorioDTO> findAll() {
        List<Relatorio> entity = repository.findAll();
        return entity.stream()
                     .map(x -> new RelatorioDTO(x, x.getProjetosRelatorio()))
                     .collect(Collectors.toList());
    
}
	@Transactional(readOnly = true)
	public RelatorioDTO findById(Long id) {
		Optional<Relatorio> relatorio = repository.findById(id);
		Relatorio entity = relatorio.get();
		return new RelatorioDTO(entity, entity.getProjetosRelatorio()) ;
	}
	

	 @Transactional(readOnly = true)
	    public List<RelatorioDTO> findByDataAndProjeto(LocalDate data, Long projetoId) {
	        List<Relatorio> relatorio = repository.findByDataAndProjeto(data, projetoId);

	        return mapToDTOList(relatorio);
	    }
	 @Transactional(readOnly = true)
	    private List<RelatorioDTO> mapToDTOList(List<Relatorio> relatorios) {
	        return relatorios.stream()
	                .map(relatorio -> new RelatorioDTO(relatorio, relatorio.getProjetosRelatorio()))
	                .collect(Collectors.toList());
	    }
	 
	 @Transactional(readOnly = true)
	    public List<RelatorioDTO> findByProjeto(Long projetoId) {
	        List<Relatorio> relatorios = repository.findByProjetoId(projetoId);
	        return mapToDTOList(relatorios);
	    }
	 
	 @Transactional
	 	public RelatorioDTO insert(RelatorioDTO dto) {
		Relatorio entity = new Relatorio();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new RelatorioDTO(entity);

	}
	 
	 @Transactional(readOnly = true)
	 public List<RelatorioDTO> findByDate(LocalDate data) {
	     List<Relatorio> relatorios = repository.findByData(data);
	     List<RelatorioDTO> relatorioDTOList = new ArrayList<>();
	     for (Relatorio relatorio : relatorios) {
	         RelatorioDTO relatorioDTOItem = new RelatorioDTO(relatorio, relatorio.getProjetosRelatorio());
	         relatorioDTOList.add(relatorioDTOItem);
	     }
	     return relatorioDTOList;
	 }
	 
	 
	
	 public void delete(Long id) {
	    	repository.deleteById(id);
	 
	    }
	    

    private void copyDtoToEntity(RelatorioDTO dto, Relatorio entity) {
		entity.setData(dto.getData());
		entity.setPergunta1(dto.getPergunta1());
		entity.setPergunta2(dto.getPergunta2());
		entity.setPergunta3(dto.getPergunta3());
		entity.setPergunta4(dto.getPergunta4());
		entity.setPergunta5(dto.getPergunta5());
		
		ProjetosDTO pjDTO = dto.getProjetosRelatorio();
		Projetos projetos = projetosRepository.getReferenceById(pjDTO.getId());
		
		entity.setProjetosRelatorio(projetos);
	
    }
}