package com.esibape.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendNewRequerimentoNotification(String recipientEmail, String responsavel) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Novo Requerimento Criado");
        message.setText("Olá Josué, Um novo requerimento foi criado por " + responsavel + ". Acesse o sistema i-SIBAPE para mais detalhes.");

        mailSender.send(message);
    }
}
