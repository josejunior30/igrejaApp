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
import com.esibape.entities.StatusRequerimento;
import com.esibape.repository.RequerimentoOrçamentoRepository;

@Service
public class RequerimentoOrçamentoService {
	@Autowired
	private RequerimentoOrçamentoRepository repository;
	 @Autowired
	private EmailService emailService; 
	 
	@Transactional(readOnly = true)
	public List<RequerimentoOrçamentoDTO>findAll(){
		List<RequerimentoOrçamento> list = repository.findAll();
				 return list.stream()
				            .map(x -> {
				            	RequerimentoOrçamentoDTO dto = new RequerimentoOrçamentoDTO(x, x.getProduto());
				                return dto;
				            })
				            .collect(Collectors.toList());
	}
	@Transactional(readOnly = true)
    public RequerimentoOrçamentoDTO findById(Long id) {
		RequerimentoOrçamento entity = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Rquerimento não encontrado"));
		RequerimentoOrçamentoDTO dto = new RequerimentoOrçamentoDTO(entity, entity.getProduto());
     return dto;
    }
	
	@Transactional
	public RequerimentoOrçamentoDTO insert(RequerimentoOrçamentoDTO dto) {
	    RequerimentoOrçamento entity = new RequerimentoOrçamento();
	    
	    // Copia os dados do DTO para a entidade
	    copyDtoToEntity(dto, entity);
	    entity.setStatusRequerimento(StatusRequerimento.PENDENTE);
        
	    // Adiciona os produtos do DTO à entidade RequerimentoOrçamento
	    if (dto.getProduto() != null) {
	        for (ProdutoDTO produtoDTO : dto.getProduto()) {
	            Produto produto = new Produto();  // Cria uma nova instância de Produto
	            produto.setNome(produtoDTO.getNome());
	            produto.setPreço(produtoDTO.getPreço());
	            // Defina outros atributos de Produto conforme necessário
	            
	            entity.addProduto(produto); // Adiciona o produto à entidade RequerimentoOrçamento
	        }
	    }

	    // Salva a entidade RequerimentoOrçamento com os produtos no repositório
	    entity = repository.save(entity);
	 // Após salvar, enviar o e-mail de notificação para outro usuário
	    String recipientEmail = "joseluizjunior@yahoo.com"; // Defina o e-mail do usuário a ser notificado
        emailService.sendNewRequerimentoNotification(recipientEmail, entity.getResponsavel());
	    return new RequerimentoOrçamentoDTO(entity);
	}


	@Transactional
    public RequerimentoOrçamentoDTO update(Long id, RequerimentoOrçamentoDTO dto) {
        RequerimentoOrçamento entity = repository.getReferenceById(id);
        copyDtoToEntity(dto, entity);

        // Atualiza os produtos associados ao requerimento
        entity.getProduto().clear(); 

        if (dto.getProduto() != null) {
            for (ProdutoDTO produtoDTO : dto.getProduto()) {
                Produto produto = new Produto();
                produto.setNome(produtoDTO.getNome());
                produto.setPreço(produtoDTO.getPreço());

                entity.addProduto(produto);  
            }
        }

        entity = repository.save(entity);
        return new RequerimentoOrçamentoDTO(entity);
    }
	  public void delete(Long id) {
	        repository.deleteById(id);
	    }
	  
	  
	private void copyDtoToEntity(RequerimentoOrçamentoDTO dto, RequerimentoOrçamento entity) {
      
        entity.setDataAprovacao(dto.getDataAprovacao());
        entity.setDataEvento(dto.getDataEvento());
        entity.setDataPagamento(dto.getDataPagamento());
        entity.setDataRequerimento(dto.getDataRequerimento());
        entity.setLocal(dto.getLocal());
        entity.setPergunta1(dto.getPergunta1());
        entity.setPergunta2(dto.getPergunta2());
        entity.setResponsavel(dto.getResponsavel());
        entity.setStatusRequerimento(dto.getStatusRequerimento());
     
     
	}
}