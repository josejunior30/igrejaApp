package com.esibape.service;

import java.util.List;
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
import com.esibape.repository.MaterialObraRepository;
import com.esibape.repository.OrdemServicoRepository;

import com.esibape.repository.ServicoRepository;


@Service
public class OrdemServicoService {
	@Autowired
	private OrdemServicoRepository repository;
	@Autowired
	private ServicoRepository servicoRepository;

    @Autowired
    private MaterialObraRepository materialObraRepository;
	@Transactional(readOnly = true)
	public List<OrdemServicoDTO>findAll(){
		List<OrdemServico> list = repository.findAll();
				 return list.stream()
				            .map(x -> {
				            	OrdemServicoDTO dto = new OrdemServicoDTO(x, x.getServicos());
				                return dto;
				            })
				            .collect(Collectors.toList());
	}
	@Transactional(readOnly = true)
    public OrdemServicoDTO findById(Long id) {
		OrdemServico entity = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Ordem serviço não encontrado"));
		OrdemServicoDTO dto = new OrdemServicoDTO(entity, entity.getServicos());
     return dto;
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
	        return repository.save(ordemServico);
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