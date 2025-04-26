package com.esibape.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;



import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.esibape.entities.Atendimento;

import com.esibape.entities.Membro;
import com.esibape.entities.Visitante;
import com.esibape.repository.AtendimentoRepository;
import com.esibape.repository.MembroRepository;

@Service
public class AtendimentoScheduler {

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private MembroRepository membroRepository;

    @Autowired
    private WhatsappService whatsappService;


    @Scheduled(fixedRate = 60000)
    @Transactional
    public void notificarCargosComAtendimentoProximo() {
        LocalDate hoje = LocalDate.now();
        LocalTime agora = LocalTime.now();
        LocalTime inicio = agora.plusHours(3).minusMinutes(1);
        LocalTime fim = agora.plusHours(3).plusMinutes(1);

        System.out.println("[SCHEDULER] Verificando atendimentos entre " + inicio + " e " + fim);

        List<Atendimento> atendimentos = atendimentoRepository.findByDataAndHorarioBetween(hoje, inicio, fim);

        System.out.println("[SCHEDULER] Total atendimentos encontrados: " + atendimentos.size());

        if (!atendimentos.isEmpty()) {
            // Notificar membros com CargoMembro ID 1 com info do atendimento
            List<Membro> membros = membroRepository.findAll();
            for (Membro membro : membros) {
                boolean hasCargoId1 = membro.getCargoMembro().stream().anyMatch(c -> c.getId() == 1);
                if (hasCargoId1) {
                    String telefone = membro.getTelefone();
                    if (telefone != null && !telefone.isBlank()) {
                        for (Atendimento atendimento : atendimentos) {
                            for (Membro agendado : atendimento.getMembro()) {
                                String nomeCompleto = agendado.getNome() + " " + agendado.getSobrenome();
                                String horario = atendimento.getHorario().toString();
                                String mensagem = "Ola pastor, passando pra lembrar que vc tem um atendimento no gabinete com, " + nomeCompleto + "  às " + horario;
                                System.out.println("[WHATSAPP] Enviando mensagem para cargo ID 1: " + telefone);
                                whatsappService.sendMessage(telefone, mensagem);
                            }
                        }
                    } else {
                        System.out.println("[WHATSAPP] Telefone inválido para membro: " + membro.getNome());
                    }
                }
            }

            // Notificar membros do atendimento com horário
            for (Atendimento atendimento : atendimentos) {
                for (Membro membro : atendimento.getMembro()) {
                    String telefone = membro.getTelefone();
                    if (telefone != null && !telefone.isBlank()) {
                        System.out.println("[WHATSAPP] Enviando horário ao membro agendado: " + telefone);
                        whatsappService.sendMessage(telefone, "Você tem um atendimento hoje às " + atendimento.getHorario().toString());
                    } else {
                        System.out.println("[WHATSAPP] Telefone inválido para membro agendado: " + membro.getNome());
                    }
                }

                // Notificar visitantes do atendimento com horário
                for (Visitante visitante : atendimento.getVisitante()) {
                    String telefone = visitante.getTelefone();
                    if (telefone != null && !telefone.isBlank()) {
                        System.out.println("[WHATSAPP] Enviando horário ao visitante: " + telefone);
                        whatsappService.sendMessage(telefone, "Você tem um atendimento hoje às " + atendimento.getHorario().toString());
                    } else {
                        System.out.println("[WHATSAPP] Telefone inválido para visitante");
                    }
                }
            }
        }
    }
}
