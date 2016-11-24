package com.thomson.spring.websocket.controller;

import com.thomson.spring.websocket.domain.ItemRequest;
import com.thomson.spring.websocket.domain.ItemResponseMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("/")
public class ItemRequestController {
  private final SimpMessagingTemplate template;
  private static final Logger logger = LoggerFactory.getLogger(ItemRequestController.class);

  @Autowired
  public ItemRequestController(SimpMessagingTemplate template) {
    this.template = template;
  }

  @MessageMapping("/item-requests")
  public void greeting(ItemRequest itemRequest, Principal principal) throws InterruptedException {
    logger.info("Received request to process item request");
    String artifactId = itemRequest.getArtifacts().get(0);

    //simulate transmitting a message for 60 seconds.
    for (int index = 0; index < 30; index++) {
      TimeUnit.SECONDS.sleep(1);
      ItemResponseMessage message =
        new ItemResponseMessage(LocalDateTime.now(),
          artifactId,
          "Processing this Artifact: " + artifactId,
          false);
      logger.info("Sending Message: {}", message.getMessage());
      template
        .convertAndSendToUser(principal.getName(), "/topic/item-requests", message);
    }

    ItemResponseMessage completedMessage =
      new ItemResponseMessage(LocalDateTime.now(),
        artifactId,
        "Completed Processing this Artifact: " + artifactId,
        true);
    template.convertAndSendToUser(principal.getName(),
      "/topic/item-requests", completedMessage);

  }
}
