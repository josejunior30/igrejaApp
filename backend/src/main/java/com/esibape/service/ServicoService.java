package com.esibape.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esibape.entities.MaterialObra;
import com.esibape.entities.OrdemServico;
import com.esibape.entities.Servico;
import com.esibape.entities.StatusOrdemDeServico;
import com.esibape.entities.StatusServico;
import com.esibape.repository.OrdemServicoRepository;
import com.esibape.repository.ServicoRepository;

@Service
public class ServicoService {
	 @Autowired
	    private ServicoRepository servicoRepository;
	 
	 @Autowired
	    private OrdemServicoRepository ordemServicoRepository;

	 public void verificarMateriaisEAtualizarStatus(Long servicoId) {
		    Servico servico = servicoRepository.findById(servicoId)
		            .orElseThrow(() -> new EntityNotFoundException("Serviço não encontrado"));

		    List<MaterialObra> materiais = servico.getMaterialObra();

		    if (materiais.isEmpty()) {
		        servico.setStatusServico(StatusServico.PENDENTE);
		    } else {
		        boolean todosConfirmados = materiais.stream()
		                .allMatch(m -> Boolean.TRUE.equals(m.getCheckInConfirmado()));

		        if (todosConfirmados) {
		            servico.setStatusServico(StatusServico.EM_ANDAMENTO);

		            if (servico.getOrdemServico() != null) {
		                servico.getOrdemServico().setStatusOrdem(StatusOrdemDeServico.EM_ANDAMENTO);
		                ordemServicoRepository.save(servico.getOrdemServico());
		            }
		        } else {
		            servico.setStatusServico(StatusServico.PENDENTE);
		        }
		    }

		    servicoRepository.save(servico);
		}
	 @Transactional
	 public void atualizarStatusServico(Long servicoId, StatusServico novoStatus) {
	     Servico servico = servicoRepository.findById(servicoId)
	         .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

	     servico.setStatusServico(novoStatus);
	     servicoRepository.save(servico);

	     // Verifica se todos os serviços da ordem estão CONCLUIDOS
	     OrdemServico ordem = servico.getOrdemServico(); // supondo que Servico tem um getOrdemServico()
	     List<Servico> servicosDaOrdem = servicoRepository.findByOrdemServicoId(ordem.getId());

	     boolean todosConcluidos = servicosDaOrdem.stream()
	         .allMatch(s -> s.getStatusServico() == StatusServico.CONCLUIDA);

	     if (todosConcluidos) {
	         ordem.setStatusOrdem(StatusOrdemDeServico.CONCLUIDA); // Enum para o status da ordem
	         ordemServicoRepository.save(ordem);
	     }
	 }


}
