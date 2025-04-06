package com.esibape.service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.OrdemServicoDTO;
import com.esibape.DTO.ServicoDTO;
import com.esibape.entities.MaterialObra;
import com.esibape.entities.OrdemServico;
import com.esibape.entities.Servico;
import com.esibape.repository.OrdemServicoRepository;
import com.esibape.repository.ServicoRepository;


@Service
public class OrdemServicoService {
	@Autowired
	private OrdemServicoRepository repository;
	@Autowired
	private ServicoRepository servicoRepository;
	@Autowired
	private  ServicoService servicoService;
 
	@Transactional(readOnly = true)
	public List<OrdemServicoDTO> findAll() {
	    List<OrdemServico> list = repository.findAll();

	    return list.stream()
	               .map(ordem -> {
	                   ordem.getServicos().forEach(servico -> servico.getMaterialObra().size());
	                   return new OrdemServicoDTO(ordem, true); 
	               })
	               .collect(Collectors.toList());
	}


    @Transactional(readOnly = true)
    public OrdemServicoDTO findById(Long id) {
        OrdemServico entity = repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Ordem serviço não encontrado"));

   
        entity.getServicos().forEach(servico -> {
            servico.getMaterialObra().size();
        });

        return new OrdemServicoDTO(entity, entity.getServicos());
    }

	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	    }
	    
	   @Transactional
	    public OrdemServicoDTO insert(OrdemServicoDTO dto) {
		   OrdemServico entity =  new OrdemServico();
	    		copyDtoToEntity(dto, entity);	
	    		entity = repository.save(entity);
	    		return new OrdemServicoDTO(entity);
	    	
	    }
	   @Transactional
	    public OrdemServico criarOrdemServico(OrdemServico ordemServico) {
	        if (ordemServico.getServicos() != null) {
	            for (Servico servico : ordemServico.getServicos()) {
	                servico.setOrdemServico(ordemServico);
	                if (servico.getMaterialObra() != null) {
	                    for (MaterialObra material : servico.getMaterialObra()) {
	                        material.setServico(servico);
	                    }
	                }
	            }
	        }

	        OrdemServico saved = repository.save(ordemServico);

	        // Chamada para o outro módulo aqui
	        saved.getServicos().forEach(servico -> 
	            servicoService.verificarMateriaisEAtualizarStatus(servico.getId())
	        );

	        return saved;
	    }



	private void copyDtoToEntity(OrdemServicoDTO dto, OrdemServico entity) {
      
        entity.setDescricao(dto.getDescricao());
        entity.setStatusOrdem(dto.getStatusOrdem());
        
        List<ServicoDTO> chaDTO = dto.getServicos();
        List<Servico> servicos = chaDTO.stream()
            .map(servicoDto ->servicoRepository.getReferenceById(servicoDto.getId()))
            .collect(Collectors.toList());
        entity.setServicos(servicos);
   
     
	}
	
}