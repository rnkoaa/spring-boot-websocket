package com.thomson.spring.websocket.service;

import com.thomson.spring.websocket.domain.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * Created by rnkoaa on 8/13/15.
 */
@Service
public class GreetingService {
    private SimpMessagingTemplate template;

    @Autowired
    public GreetingService(SimpMessagingTemplate template) {
        this.template = template;
    }

    public void sendMessageLoop(HelloMessage helloMessage) {
        for (int index = 0; index < 10; index++) {
            String text = "[" + index + "]:" + helloMessage.getName();
            this.template.convertAndSend("/user/topic/greetings", text);
        }
    }
}
