package com.ycyw.your_car_your_way_app.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.ycyw.your_car_your_way_app.services.ChatUserRegistryService;

@Component
public class WebSocketEventListener {

    @Autowired
    private ChatUserRegistryService userRegistry; // Service à implémenter pour suivre les connexions

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        // Un nouveau client est connecté. Vous pouvez extraire des infos via
        // StompHeaderAccessor
        System.out.println("Nouvelle connexion WebSocket");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            // Supprimer l'utilisateur de la registry
            userRegistry.removeUser(username);
            // Optionnel : notifier les supports que ce client est déconnecté
        }
    }
}
