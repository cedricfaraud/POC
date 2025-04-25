package com.ycyw.your_car_your_way_app.controller;

import java.time.Instant;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.ycyw.your_car_your_way_app.dto.ChatMessage;
import com.ycyw.your_car_your_way_app.model.ChatMessageDocument;
import com.ycyw.your_car_your_way_app.model.ChatMessageEntity;
import com.ycyw.your_car_your_way_app.model.User;
import com.ycyw.your_car_your_way_app.services.ChatMessageService;
import com.ycyw.your_car_your_way_app.services.UserService;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private UserService userService;

    // Route les messages de type CHAT
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage, StompHeaderAccessor headerAccessor) {

        // Récupération de l'ID de session généré par Spring
        String chatSessionId = headerAccessor.getSessionId();

        User userByEmail = userService.getUserByEmail(chatMessage.getSender());

        // Si l'utilisateur n'existe pas, le créer pour garder une trace de l'échange
        if (userByEmail == null) {
            // Crée un nouvel utilisateur avec l'email fourni
            User newUser = new User();
            newUser.setEmail(chatMessage.getSender());
            // Vous pouvez adapter en ajoutant des valeurs par défaut ou d'autres
            // informations ici
            userByEmail = userService.save(newUser);
            // userService.save() doit persister l'utilisateur et retourner l'entité avec
            // l'ID généré.
        }
        int senderId = userByEmail.getUserId(); // À remplacer par la récupération de l'id de l'utilisateur authentifié

        // Conserver l'heure d'envoi et construire l'entité en utilisant le builder
        // (sans fournir messageId)
        ChatMessageEntity savedMessage = ChatMessageEntity.builder()
                .chatSessionId(chatSessionId)
                .senderId(senderId)
                .messageContent(chatMessage.getContent())
                .sentTime(LocalDateTime.now())
                .build();

        // Convertir le ChatMessage DTO en ChatMessageDocument
        ChatMessageDocument document = new ChatMessageDocument();
        document.setSender(chatMessage.getSender());
        document.setReceiver(chatMessage.getReceiver());
        document.setContent(chatMessage.getContent());
        document.setTimestamp(Instant.ofEpochMilli(chatMessage.getTimestamp()));
        document.setChatSessionId(chatSessionId);

        // Sauvegarder le document dans la base MongoDB
        chatMessageService.saveMessage(document);

        // Optionnel : Vous pouvez enrichir le DTO avant de l’envoyer, par exemple en
        // rajoutant le timestamp final
        chatMessage.setTimestamp(System.currentTimeMillis());

        // Diffuser le message à tous les clients abonnés au topic "/topic/chat"
        messagingTemplate.convertAndSend("/topic/chat", chatMessage);
    }

    // Lorsqu'un utilisateur se connecte
    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage, StompHeaderAccessor headerAccessor) {

        System.out.println("chat.addUser : " + chatMessage.getSender());
        // Stocker le nom de l'utilisateur dans la session WebSocket
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());

        // Éventuellement notifier les supports d’un nouveau client connecté
    }
}
