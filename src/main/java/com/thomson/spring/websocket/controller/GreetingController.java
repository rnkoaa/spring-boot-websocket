package com.thomson.spring.websocket.controller;

import com.thomson.spring.websocket.domain.Greeting;
import com.thomson.spring.websocket.domain.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class GreetingController {

	@MessageMapping("/hello")
    @SendToUser("/topic/greetings")
	public Greeting greeting(HelloMessage helloMessage) throws InterruptedException {
		Thread.sleep(300); //simulated delay
		return new Greeting("Hello, " + helloMessage.getName() + "!");
	}
}