import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { AuthService } from './auth.service'; // Assurez-vous que c'est le bon chemin vers votre AuthService

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();
  private stompClient!: CompatClient;
  // URL de l'endpoint WebSocket (remplacez par votre URL réelle)
  private serverUrl = 'https://localhost:8443/ws';

  constructor(private authService: AuthService) {
    this.connect();
  }

  private connect(): void {
    console.log('Connecting via SockJS/STOMP...');

    // Crée la connexion SockJS
    const socket = new SockJS(this.serverUrl);

    // Crée le client STOMP en passant la fonction qui retourne le socket SockJS
    this.stompClient = Stomp.over(() => socket);
    this.stompClient.debug = () => {}; // Désactive le debug

    // Ajoutez un header d'authentification si nécessaire
    //const token = localStorage.getItem('auth_token');
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWxpY2UuZHVwb250QGV4YW1wbGUuY29tIiwiZXhwIjoxNzQ2MDgzODczLCJpYXQiOjE3NDU0NzkwNzN9.D6CvxyR60qVKQMIIEGpRRJHdJ2q8ZnwJ-pnmpeJYdHM';
    const headers = token ? { Authorization: 'Bearer ' + token } : {};

    // Connectez-vous avec STOMP
    this.stompClient.connect(headers, (frame: any) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/topic/chat', (message: any) => {
        if (message.body) {
          this.messageSubject.next(JSON.parse(message.body));
        }
      });
    });
  }

  // Observable pour écouter les messages
  public onMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  // Envoyer un message au serveur
  public sendMessage(message: any): void {
    console.log("Tentative d'envoi du message : ", message);
    if (this.stompClient && this.stompClient.connected) {
      // Utilise l'API STOMP pour envoyer le message à un endpoint (exemple)
      this.stompClient.send(
        '/app/chat.sendMessage',
        {},
        JSON.stringify(message)
      );
      console.log('Message envoyé via STOMP');
    } else {
      console.error('STOMP client not connected. Message not sent.');
    }
  }

  // Fermer la connexion WebSocket proprement
  public disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('STOMP client disconnected.');
      });
    }
  }
}
