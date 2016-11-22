package com.thomson.spring.websocket.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created on 11/22/2016.
 */
@Controller
public class HomeController {

  @GetMapping({"", "/"})
  public String home() {
    return "index";
  }
}
