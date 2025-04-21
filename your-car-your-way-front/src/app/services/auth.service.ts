import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fournit le service dans toute l'application.
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Lien vers votre backend Spring Boot.

  constructor(private http: HttpClient) {}

  // Méthode pour effectuer la connexion.
  login(data: {
    email?: string;
    username?: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
