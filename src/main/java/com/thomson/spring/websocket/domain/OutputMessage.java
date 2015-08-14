package com.thomson.spring.websocket.domain;

import java.util.Date;

/**
 * Created by U0165547 on 8/13/2015.
 */
public class OutputMessage extends Message {
    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    private Date time;

    public OutputMessage(Message original, Date time) {
        super(original.getMessage(), original.getId());
        this.time = time;
    }
}
