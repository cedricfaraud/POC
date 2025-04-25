package com.ycyw.your_car_your_way_app.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "ChatMessage")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int messageId;

    // Par simplicité, vous pouvez stocker l'ID de la session de chat.
    // Si vous avez aussi une entité ChatSession, utilisez une relation @ManyToOne
    @Column(name = "chat_session_id", nullable = false)
    private String chatSessionId;

    // L'ID de l'utilisateur qui envoie le message.
    @Column(name = "sender_id", nullable = false)
    private int senderId;

    // Le contenu du message
    @Column(name = "message", columnDefinition = "TEXT", nullable = false)
    private String messageContent;

    // Date/heure d'envoi du message.
    @Column(name = "sent_time", nullable = false)
    private LocalDateTime sentTime;

}
