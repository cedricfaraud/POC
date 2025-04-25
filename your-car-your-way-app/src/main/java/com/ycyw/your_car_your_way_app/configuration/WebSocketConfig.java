package com.ycyw.your_car_your_way_app.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Configure le broker pour gérer les messages
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Un broker simple pour diffuser aux clients abonnés
        config.enableSimpleBroker("/topic", "/queue");
        // Préfixe pour les messages entrants (envoyés par les clients)
        config.setApplicationDestinationPrefixes("/app");
    }

    // Définit l'endpoint pour établir la connexion WebSocket
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

}
