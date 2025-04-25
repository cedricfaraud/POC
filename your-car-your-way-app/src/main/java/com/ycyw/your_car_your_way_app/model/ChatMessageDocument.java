package com.ycyw.your_car_your_way_app.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chat_messages")
public class ChatMessageDocument {

    @Id
    private String id;

    private String sender;
    private String receiver;
    private String content;
    private Instant timestamp;
    private String chatSessionId;
}
