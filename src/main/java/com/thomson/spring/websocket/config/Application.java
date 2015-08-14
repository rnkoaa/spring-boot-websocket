package com.thomson.spring.websocket.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.thomson.spring.websocket"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}