import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest.interface';
import { AuthSuccess } from '../interfaces/authSuccess.interface';

@Injectable({
  providedIn: 'root', // Fournit le service dans toute l'application.
})
export class AuthService {
  private apiUrl = 'http://localhost:3007'; // Lien vers votre backend Spring Boot.

  constructor(private http: HttpClient) {}

  // Méthode pour effectuer la connexion.
  login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.http.post<AuthSuccess>(
      `https://localhost:8443/login`,
      loginRequest
    );
  }
}
