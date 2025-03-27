package com.esibape.service;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esibape.DTO.ProdutoDTO;
import com.esibape.DTO.RequerimentoOrçamentoDTO;
import com.esibape.entities.Cargo;
import com.esibape.entities.ContaPagar;
import com.esibape.entities.DescricaoConta;
import com.esibape.entities.Lideranca;
import com.esibape.entities.Produto;
import com.esibape.entities.RequerimentoOrçamento;
import com.esibape.entities.StatusPagamento;
import com.esibape.entities.StatusRequerimento;
import com.esibape.entities.TipoDespesa;
import com.esibape.repository.ContaPagarRepository;
import com.esibape.repository.DescricaoContaRepository;
import com.esibape.repository.LiderancaRepository;
import com.esibape.repository.RequerimentoOrçamentoRepository;


@Service
public class RequerimentoOrçamentoService {
	@Autowired
	private RequerimentoOrçamentoRepository repository;
	 @Autowired
	private EmailService emailService; 
	 @Autowired
	 private LiderancaRepository liderancaRepository;
	 
		@Autowired
		private ContaPagarRepository contaPagarRepository;
		
		@Autowired
		private DescricaoContaRepository descricaoContaRepository;
		 
			@Autowired
			private ContaPagarService contaPagarService;
		 
	 
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
	    // Testa a autenticação antes de continuar
	    String authenticatedUser = contaPagarService.getAuthenticatedUser();
	    System.out.println("Authenticated User in RequerimentoOrçamentoDTO insert: " + authenticatedUser);

	    if (dto.getDescricaoRequerimento() == null || dto.getDescricaoRequerimento().getDescricao() == null || dto.getDescricaoRequerimento().getDescricao().trim().isEmpty()) {
            throw new IllegalArgumentException("A descrição não pode ser nula ou vazia!");
        }
	    // Buscar ou criar a descrição corretamente
        DescricaoConta descricaoConta = descricaoContaRepository.findByDescricao(dto.getDescricaoRequerimento().getDescricao().trim())
            .orElseGet(() -> {
                DescricaoConta novaDescricao = new DescricaoConta();
                novaDescricao.setDescricao(dto.getDescricaoRequerimento().getDescricao().trim());  // Agora está correto
                return descricaoContaRepository.save(novaDescricao);
            });


	    
	    
	    RequerimentoOrçamento entity = new RequerimentoOrçamento();
	    copyDtoToEntity(dto, entity);
	    entity.setDescricaoRequerimento(descricaoConta);  
	    entity.setStatusRequerimento(StatusRequerimento.PENDENTE);
	    entity.setCreatedByRequerimento(authenticatedUser);

	    // Garante que contaPagar seja NULL
	    entity.setContaPagar(null);

	    // Adiciona os produtos, se houver
	    if (dto.getProduto() != null) {
	        List<Produto> produtos = new ArrayList<>();
	        for (ProdutoDTO produtoDTO : dto.getProduto()) {
	            Produto produto = new Produto();
	            produto.setNome(produtoDTO.getNome());
	            produto.setPreço(produtoDTO.getPreço());
	            produto.setQuantidade(produtoDTO.getQuantidade());
	            produto.setRequerimento(entity);
	            produtos.add(produto);
	        }
	        entity.setProduto(produtos);
	    }

	    // Calcula o total antes de salvar
	    entity.calcularTotal();

	    // Salva no banco
	    entity = repository.save(entity);

	    // Notificação por e-mail, se houver líder de finanças cadastrado
	    Optional<Lideranca> liderFinancas = liderancaRepository.findByCargo(Cargo.FINANÇAS);
	    if (liderFinancas.isPresent()) {
	        Lideranca lider = liderFinancas.get();
	        try {
	            emailService.sendNewRequerimentoNotification(lider.getEmail(), lider.getNome(), entity.getResponsavel());
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
	    }

	    return new RequerimentoOrçamentoDTO(entity, entity.getProduto());
	}


	@Transactional
	public RequerimentoOrçamentoDTO updateStatus(Long id, StatusRequerimento newStatus) throws MessagingException {
	    RequerimentoOrçamento entity = repository.findById(id)
	        .orElseThrow(() -> new NoSuchElementException("Requerimento não encontrado"));

	    entity.setStatusRequerimento(newStatus);
	    String recipientEmail = entity.getCreatedByRequerimento();

	    // **Gerenciar ContaPagar ao Aprovar**
	    if (newStatus == StatusRequerimento.APROVADO) {
	        ContaPagar contaPagar = entity.getContaPagar();

	        if (contaPagar == null) {
	            // Criar uma nova ContaPagar se não existir
	            contaPagar = new ContaPagar();
	            contaPagar.setDescricaoConta(entity.getDescricaoRequerimento());
	            contaPagar.setDataCriacao(LocalDateTime.now());
	            contaPagar.setStatus(StatusPagamento.PENDENTE);
	            contaPagar.setTipoDespesa(TipoDespesa.VARIAVEL);
	            contaPagar.setCreatedBy(entity.getResponsavel());
	            contaPagar.setCreatedByConta(entity.getResponsavel());
	            contaPagar.setValor(BigDecimal.ZERO); // Garante que não seja nulo
	        }

	        // Atualiza valores da ContaPagar
	        contaPagar.setValor(contaPagar.getValor().add(entity.getTotal()));
	        contaPagar.setDataVencimento(entity.getDataPagamento());

	        // Adiciona o requerimento à lista de requerimentos da ContaPagar (relacionamento bidirecional)
	        if (!contaPagar.getRequerimentoOrçamento().contains(entity)) {
	            contaPagar.getRequerimentoOrçamento().add(entity);
	        }

	        // Salvar ContaPagar
	        contaPagar = contaPagarRepository.save(contaPagar);

	        // Associar o ContaPagar ao requerimento
	        entity.setContaPagar(contaPagar);
	    } else {
	        // Se não for aprovado, o ContaPagar deve ser mantido como está
	        entity.setContaPagar(null);
	    }

	    // **Envio de e-mail para aprovação/recusa**
	    if (recipientEmail != null && !recipientEmail.isEmpty()) {
	        if (newStatus == StatusRequerimento.APROVADO) {
	            emailService.sendApprovalNotification(recipientEmail);
	        } else if (newStatus == StatusRequerimento.RECUSADO) {
	            emailService.sendRejectionNotification(recipientEmail);
	        }
	    } else {
	        System.out.println("Email do criador do requerimento não encontrado, notificação não enviada.");
	    }

	    // Salvar Requerimento atualizado
	    entity = repository.save(entity);

	    return new RequerimentoOrçamentoDTO(entity);
	}


	@Transactional
	public RequerimentoOrçamentoDTO update(Long id, RequerimentoOrçamentoDTO dto) {
	    RequerimentoOrçamento entity = repository.findById(id)
	            .orElseThrow(() -> new NoSuchElementException("Requerimento não encontrado"));

	    copyDtoToEntity(dto, entity);

	    if (dto.getProduto() != null) {
	        // Removendo produtos antigos que não estão na nova lista
	        entity.getProduto().removeIf(produto -> 
	            dto.getProduto().stream().noneMatch(p -> p.getId() != null && p.getId().equals(produto.getId()))
	        );

	        // Atualiza produtos existentes e adiciona novos
	        for (ProdutoDTO produtoDTO : dto.getProduto()) {
	            Produto produto = entity.getProduto().stream()
	                    .filter(p -> produtoDTO.getId() != null && p.getId().equals(produtoDTO.getId()))
	                    .findFirst()
	                    .orElse(null);

	            if (produto == null) {
	                // Criar um novo produto se não existir
	                produto = new Produto();
	                produto.setRequerimento(entity); // Associa ao requerimento
	                entity.getProduto().add(produto); // Adiciona na lista
	            }

	            // Atualiza os dados do produto (seja novo ou existente)
	            produto.setNome(produtoDTO.getNome());
	            produto.setPreço(produtoDTO.getPreço());
	            produto.setQuantidade(produtoDTO.getQuantidade());
	        }
	    }

	    entity = repository.save(entity);
	    return new RequerimentoOrçamentoDTO(entity, entity.getProduto());
	}

	@Transactional
	public void delete(Long id) {
	    // Busca o Requerimento pelo ID
	    RequerimentoOrçamento entity = repository.findById(id)
	        .orElseThrow(() -> new NoSuchElementException("Requerimento não encontrado"));

	    ContaPagar contaPagar = entity.getContaPagar();

	    // Se existir uma ContaPagar vinculada, verificar se pode ser excluída
	    if (contaPagar != null) {
	        // Remove o requerimento da lista de requerimentos da ContaPagar
	        contaPagar.getRequerimentoOrçamento().remove(entity);

	        // Se a ContaPagar não tiver mais nenhum requerimento vinculado, deletá-la
	        if (contaPagar.getRequerimentoOrçamento().isEmpty()) {
	            contaPagarRepository.delete(contaPagar);
	        }
	    }

	    // Excluir o requerimento
	    repository.delete(entity);
	}


	  @Transactional(readOnly = true)
	  public List<RequerimentoOrçamentoDTO> findByMonthAndYear(int month, int year) {
	      LocalDate startDate = LocalDate.of(year, month, 1);
	      LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
	      
	      List<RequerimentoOrçamento> list = repository.findByDataRequerimentoBetween(startDate, endDate);
	      
	      return list.stream()
	                 .map(entity -> new RequerimentoOrçamentoDTO(entity, entity.getProduto()))
	                 .collect(Collectors.toList());
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
        
        entity.setQuantidade(dto.getQuantidade());
        entity.setEmailResponsavel(dto.getEmailResponsavel());
        entity.setStatusRequerimento(dto.getStatusRequerimento());
   
     
	}
	
}