package com.esibape.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.ProdutoDTO;
import com.esibape.DTO.RequerimentoOrçamentoDTO;
import com.esibape.entities.Produto;
import com.esibape.entities.RequerimentoOrçamento;
import com.esibape.repository.ProdutoRepository;
import com.esibape.repository.RequerimentoOrçamentoRepository;

@Service
public class ProdutoService {
	
	@Autowired
	private ProdutoRepository repository;

	@Autowired
	private RequerimentoOrçamentoRepository requerimentoRepository;

	@Transactional(readOnly = true)
	public List<ProdutoDTO>findAll(){
		List<Produto> list = repository.findAll();
				 return list.stream()
				            .map(x -> {
				            	ProdutoDTO dto = new ProdutoDTO(x);
				                return dto;
				            })
				            .collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
    public ProdutoDTO findById(Long id) {
		Produto entity = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Produto não encontrado"));
		ProdutoDTO dto = new ProdutoDTO(entity);
     return dto;
    }
	
	@Transactional
    public ProdutoDTO insert(ProdutoDTO dto) {
		Produto entity = new Produto();
        copyDtoToEntity(dto, entity); 
        entity = repository.save(entity);
        return new ProdutoDTO(entity);
    }
	
	@Transactional
	public ProdutoDTO update(Long id, ProdutoDTO dto) {
		Produto entity = repository.getReferenceById(id);
		copyDtoToEntity(dto, entity);
		repository.save(entity);
		return new ProdutoDTO(entity);
	}
	
	   public void delete(Long id) {
	    	repository.deleteById(id);
	 
	   }
	
	private void copyDtoToEntity(ProdutoDTO dto, Produto entity) {
	      
        entity.setNome(dto.getNome());
        entity.setPreço(dto.getPreço());
        RequerimentoOrçamentoDTO pjDTO = dto.getRequerimento();
        RequerimentoOrçamento requerimento = requerimentoRepository.getReferenceById(pjDTO.getId());
        entity.setRequerimento(requerimento);
	}
}
