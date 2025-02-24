package com.esibape.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;



    public void sendNewRequerimentoNotification(String recipientEmail, String responsavel) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");


        String htmlContent = "<html>" +
                "<body>" +
                "<h2 style='color: blue;'>Novo Requerimento Criado</h2>" +
                "<p>Olá Josué,</p>" +
                "<p>Um novo requerimento foi criado por <strong>" + responsavel + "</strong>. Acesse o sistema i-SIBAPE para mais detalhes.</p>" +
                "<p>Atenciosamente,</p>" +
                "<p><strong>Equipe i-SIBAPE</strong></p>" +
                "<p>https://sibape.com.br/</p>" +
                "</body>" +
                "</html>";

        helper.setTo(recipientEmail);
        helper.setSubject("Novo Requerimento Criado");
        helper.setText(htmlContent, true);  // O segundo parâmetro true indica que o conteúdo é HTML.

        mailSender.send(mimeMessage);
    }
    
    // Novo método para enviar e-mail de aprovação
    public void sendApprovalNotification(String recipientEmail) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        String htmlContent = "<html>" +
                "<body>" +
                "<h2 style='color: green;'>Parabéns!</h2>" +
                "<p>Seu requerimento foi aprovado!</p>" +
                "<p>Atenciosamente,</p>" +
                "<p><strong>Equipe i-SIBAPE</strong></p>" +
                "</body>" +
                "</html>";

        helper.setTo(recipientEmail);
        helper.setSubject("Requerimento Aprovado");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }
    public void sendRejectionNotification(String recipientEmail) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        String htmlContent = "<html>" +
                "<body>" +
                "<h2 style='color: red;'>Requerimento Recusado</h2>" +
                "<p>Atençao, seu requerimento foi recusado!</p>" +
                "<p>Acesse o Sistema para mais informaçoes.</p>" +
                "<p>Atenciosamente,</p>" +
                "<p><strong>Equipe i-SIBAPE</strong></p>" +
                "</body>" +
                "</html>";

        helper.setTo(recipientEmail);
        helper.setSubject("Requerimento Recusado");
        helper.setText(htmlContent, true);  // O segundo parâmetro true indica que o conteúdo é HTML.

        mailSender.send(mimeMessage);
    }

}