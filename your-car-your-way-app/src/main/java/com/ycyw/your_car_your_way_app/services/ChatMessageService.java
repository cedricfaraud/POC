package com.ycyw.your_car_your_way_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ycyw.your_car_your_way_app.model.ChatMessageDocument;
import com.ycyw.your_car_your_way_app.repository.ChatMessageRepository;

@Service
public class ChatMessageService {

    @Autowired
    private final ChatMessageRepository chatMessageRepository;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatMessageDocument saveMessage(ChatMessageDocument chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }
}