package com.ycyw.your_car_your_way_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ycyw.your_car_your_way_app.model.ChatMessageEntity;
import com.ycyw.your_car_your_way_app.repository.ChatMessageRepository;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository messageRepository;

    /**
     * Sauvegarde un message dans la base de données.
     */
    public ChatMessageEntity saveMessage(ChatMessageEntity messageEntity) {
        return messageRepository.save(messageEntity);
    }
}