package com.thomson.spring.websocket.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * Created using Intellij IDE
 * Created by rnkoaa on 11/24/16.
 */
public class ItemRequest {
  private List<String> artifacts = new ArrayList<>(0);

  public ItemRequest() {
  }

  public ItemRequest(List<String> artifacts) {
    this.artifacts = artifacts;
  }

  public List<String> getArtifacts() {
    return artifacts;
  }

  public void setArtifacts(List<String> artifacts) {
    this.artifacts = artifacts;
  }
}
