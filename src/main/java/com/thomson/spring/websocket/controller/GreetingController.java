package com.thomson.spring.websocket.controller;

import com.thomson.spring.websocket.domain.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("/")
public class GreetingController {
    private final SimpMessagingTemplate template;

    @Autowired
    public GreetingController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/hello")
    public void greeting(HelloMessage helloMessage, Principal principal) throws InterruptedException {
      /*  Thread.sleep(300); //simulated delay*/
      TimeUnit.MILLISECONDS.sleep(300);
        for (int i = 0; i < 25; i++) {
            template
              .convertAndSendToUser(principal.getName(), "/topic/greetings", "Hello, "
                + helloMessage.getName() + ": " + ++i + " !");
          TimeUnit.MILLISECONDS.sleep(500);
        }

        template.convertAndSendToUser(principal.getName(), "/topic/greetings", "migrationComplete");
    }
}
