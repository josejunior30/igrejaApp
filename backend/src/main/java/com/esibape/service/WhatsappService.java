package com.esibape.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class WhatsappService {

    @Value("${twilio.phone.from}")
    private String fromPhoneNumber;

    public String sendMessage(String to, String body) {
        Message message = Message.creator(
                new PhoneNumber("whatsapp:" + to),
                new PhoneNumber(fromPhoneNumber),
                body
        ).create();

        return message.getSid();
    }
}

