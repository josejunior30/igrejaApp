package com.esibape.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class WhatsappService {

    private static final Logger log = LoggerFactory.getLogger(WhatsappService.class);

    @Value("${twilio.phone.from}")
    private String fromPhoneNumber;

    public String sendMessage(String to, String body) {
        try {
            Message message = Message.creator(
                    new PhoneNumber("whatsapp:" + to),
                    new PhoneNumber(fromPhoneNumber),
                    body
            ).create();

            log.info("Mensagem enviada para {} com SID {}", to, message.getSid());
            return message.getSid();
        } catch (Exception e) {
            log.error("Erro ao enviar mensagem para {}: {}", to, e.getMessage());
            return null;
        }
    }
}