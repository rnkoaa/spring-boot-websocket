package com.thomson.spring.websocket.domain;

/**
 * Created by U0165547 on 8/13/2015.
 */
public class Message {
    private String message;
    private int id;

    public Message(String message, int id) {
        this.message = message;
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
