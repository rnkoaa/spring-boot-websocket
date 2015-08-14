package com.thomson.spring.websocket.controller;

import com.thomson.spring.websocket.domain.Greeting;
import com.thomson.spring.websocket.domain.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/")
public class GreetingController {
    @Autowired
    private SimpMessagingTemplate template;

	@MessageMapping("/hello")
  //  @SendToUser("/topic/greetings")
	public void greeting(HelloMessage helloMessage, Principal principal) throws InterruptedException {
        Thread.sleep(300); //simulated delay
        for (int i = 0; i < 10; i++) {
            template.convertAndSendToUser(principal.getName(), "/topic/greetings", "Hello, " + helloMessage.getName() + ": " + ++i + " !");
            Thread.sleep(500);
        }
	}
}