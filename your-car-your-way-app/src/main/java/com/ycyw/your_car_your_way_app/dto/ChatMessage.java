package com.ycyw.your_car_your_way_app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    public enum MessageType {
        CONNECT, // Connexion d'un utilisateur
        CHAT, // Message classique
        DISCONNECT // Déconnexion d'un utilisateur
    }

    private MessageType type;
    private String sender;
    private String receiver; // Pour un message privé (support -> client ou inversement)
    private String content;
    private long timestamp;

}
