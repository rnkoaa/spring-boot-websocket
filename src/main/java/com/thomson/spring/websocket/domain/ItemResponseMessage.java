package com.thomson.spring.websocket.domain;

import java.time.LocalDateTime;

/**
 * Created using Intellij IDE
 * Created by rnkoaa on 11/24/16.
 */
public class ItemResponseMessage {
  private LocalDateTime timestamp;
  private String message;
  private String artifact;

  public ItemResponseMessage() {
  }

  public ItemResponseMessage(LocalDateTime timestamp, String artifact, String message) {
    this.timestamp = timestamp;
    this.message = message;
    this.artifact = artifact;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getArtifact() {
    return artifact;
  }

  public void setArtifact(String artifact) {
    this.artifact = artifact;
  }
}
