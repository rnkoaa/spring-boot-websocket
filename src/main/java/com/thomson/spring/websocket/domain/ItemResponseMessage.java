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
  private boolean processingStatus;

  public ItemResponseMessage() {
  }

  public ItemResponseMessage(LocalDateTime timestamp, String artifact, String message, boolean processingStatus) {
    this.timestamp = timestamp;
    this.message = message;
    this.artifact = artifact;
    this.processingStatus = processingStatus;
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

  public boolean isProcessingStatus() {
    return processingStatus;
  }

  public void setProcessingStatus(boolean processingStatus) {
    this.processingStatus = processingStatus;
  }
}
