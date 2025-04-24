package com.ycyw.your_car_your_way_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ycyw.your_car_your_way_app.controller.requests.LoginRequest;
import com.ycyw.your_car_your_way_app.controller.responses.AuthResponse;
import com.ycyw.your_car_your_way_app.services.AuthService;
import com.ycyw.your_car_your_way_app.services.JwtTokenService;

@RestController
@CrossOrigin(origins = "https://localhost:4200")
public class AuthController {

    @Autowired
    private JwtTokenService jwtTokenService; // Composant de création/verif. du token
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String identifier = loginRequest.getEmail();

        if (!authService.authenticate(identifier, loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides");
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new AuthResponse(jwtTokenService.generateToken(identifier)));
    }
}
