package com.thomson.spring.websocket.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.InstantDeserializer;
import com.thomson.spring.websocket.security.WebSocketHandshakeHandler;
import com.thomson.spring.websocket.util.jackson.JSR310DateTimeSerializer;
import com.thomson.spring.websocket.util.jackson.JSR310LocalDateDeserializer;
import com.thomson.spring.websocket.util.jackson.JSR310LocalDateTimeConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

import java.time.*;
import java.util.List;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

  @Bean
  WebSocketHandshakeHandler webSocketHandshakeHandler() {
    return new WebSocketHandshakeHandler();
  }

  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    objectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);

    JavaTimeModule module = new JavaTimeModule();
    module.addSerializer(OffsetDateTime.class, JSR310DateTimeSerializer.INSTANCE);
    module.addSerializer(ZonedDateTime.class, JSR310DateTimeSerializer.INSTANCE);
    //module.addSerializer(LocalDateTime.class, JSR310DateTimeSerializer.INSTANCE);

    module.addSerializer(LocalDateTime.class, new JSR310LocalDateTimeConverters.LocalDateTimeSerializer());
    module.addDeserializer(LocalDateTime.class, new JSR310LocalDateTimeConverters.LocalDateTimeDeserializer());
    module.addDeserializer(OffsetDateTime.class, InstantDeserializer.OFFSET_DATE_TIME);
    module.addSerializer(Instant.class, JSR310DateTimeSerializer.INSTANCE);
    module.addDeserializer(LocalDate.class, JSR310LocalDateDeserializer.INSTANCE);
    objectMapper.registerModule(module);
    return objectMapper;
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/item-requests")
            .setHandshakeHandler(webSocketHandshakeHandler())
            .withSockJS();
  }

  @Override
  public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
    DefaultContentTypeResolver resolver = new DefaultContentTypeResolver();
    resolver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);
    MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
    converter.setObjectMapper(objectMapper());
    converter.setContentTypeResolver(resolver);
    messageConverters.add(converter);
    return false;
  }

}
