import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service'; // Assurez-vous que c'est le bon chemin vers votre AuthService

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();

  // URL de l'endpoint WebSocket (remplacez par votre URL réelle)
  private serverUrl = 'wss://localhost:8443/ws';

  constructor(private authService: AuthService) {
    this.connect();
  }

  private connect(): void {
    // Ajoutez le token d'authentification si nécessaire
    const token = localStorage.getItem('auth_token'); // ou récupéré via AuthService
    const urlWithToken = token
      ? `${this.serverUrl}?token=${token}`
      : this.serverUrl;

    // Créez la connexion WebSocket
    this.socket = new WebSocket(urlWithToken);

    // Gestion des événements WebSocket
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
      this.messageSubject.next(JSON.parse(event.data));
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.reason);
    };
  }

  // Observable pour écouter les messages
  public onMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  // Envoyer un message au serveur
  public sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket not connected. Message not sent.');
    }
  }

  // Fermer la connexion WebSocket proprement
  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
