// websocket.service.ts
import { Injectable } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { AuthService } from './auth.service'; // Assurez-vous que c'est le bon chemin vers votre AuthService

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: CompatClient;
  private messageSubject = new Subject<any>();

  // URL de l'endpoint WebSocket (si vous utilisez HTTPS, préférez wss:)
  private serverUrl = 'https://localhost:8443/ws';

  constructor(private authService: AuthService) {
    this._connect();
  }

  private _connect(): void {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(() => socket);
    this.stompClient.debug = () => {}; // Désactive le log de debug

    // Récupérer le token stocké pour l'inclure dans les headers de connexion
    const token = localStorage.getItem('auth_token'); // ou bien depuis AuthService

    // Vous pouvez ajouter un header d'authentification
    const headers = token ? { Authorization: 'Bearer ' + token } : {};

    // Connexion au serveur avec les en-têtes
    this.stompClient.connect(headers, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/user/queue/messages', (message: any) => {
        if (message.body) {
          this.messageSubject.next(JSON.parse(message.body));
        }
      });
    });
  }

  public onMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  public sendMessage(message: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/app/chat.sendMessage',
        {},
        JSON.stringify(message)
      );
    } else {
      console.error('STOMP client not connected');
    }
  }

  public addUser(user: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/chat.addUser', {}, JSON.stringify(user));
    }
  }
}
