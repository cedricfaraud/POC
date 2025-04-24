package com.ycyw.your_car_your_way_app.services;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ycyw.your_car_your_way_app.dto.UserSession;

@Service
public class ChatUserRegistryService {

    // On peut utiliser une map username -> UserSession
    private ConcurrentHashMap<String, UserSession> sessions = new ConcurrentHashMap<>();

    public void addUser(String username, UserSession session) {
        sessions.put(username, session);
    }

    public void removeUser(String username) {
        sessions.remove(username);
    }

    public List<UserSession> getClients() {
        return sessions.values().stream()
                .filter(user -> "CLIENT".equals(user.getRole()))
                .collect(Collectors.toList());
    }

    public List<UserSession> getSupports() {
        return sessions.values().stream()
                .filter(user -> "SUPPORT".equals(user.getRole()))
                .collect(Collectors.toList());
    }
}
