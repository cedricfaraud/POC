package com.ycyw.your_car_your_way_app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSession {

    public enum ChatStatus {
        WAITING, // Le client est connecté et en attente d'être pris en charge par un support
        ENGAGED, // Le client est en conversation avec un support
        OFFLINE // L'utilisateur est déconnecté
    }

    private String username;
    private String sessionId;
    private String role; // "CLIENT" ou "SUPPORT"
    private ChatStatus status;
}
