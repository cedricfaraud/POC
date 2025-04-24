package com.ycyw.your_car_your_way_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ycyw.your_car_your_way_app.model.ChatMessageEntity;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Integer> {
    List<ChatMessageEntity> findByChatSessionId(int chatSessionId);

    ChatMessageEntity save(ChatMessageEntity messageEntity);
}
