package com.ycyw.your_car_your_way_app.controller.requests;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
