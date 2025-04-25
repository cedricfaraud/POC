package com.ycyw.your_car_your_way_app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ycyw.your_car_your_way_app.model.ChatMessageDocument;

public interface ChatMessageRepository extends MongoRepository<ChatMessageDocument, String> {

}
