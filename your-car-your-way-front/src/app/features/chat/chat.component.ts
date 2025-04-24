// src/app/components/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

export interface ChatMessage {
  type: 'CHAT' | 'CONNECT' | 'DISCONNECT';
  sender: string;
  receiver?: string;
  content: string;
  timestamp?: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  // Simuler l'utilisateur logué ; en pratique, vous récupérerez ces infos depuis le service d'authentification
  loggedUser = { username: 'User1', role: 'CLIENT' }; // Pour tester le support, mettez role: 'SUPPORT'

  // Liste des messages échangés
  messages: ChatMessage[] = [];

  // Message à envoyer
  newMessage: string = '';

  // Pour les utilisateurs SUPPORT : liste des clients connectés
  connectedClients: string[] = [];
  // Le client sélectionné pour ouvrir la conversation
  selectedClient: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Si SUPPORT, simuler la récupération de clients connectés
    if (this.loggedUser.role === 'SUPPORT') {
      // Vous pourrez par la suite les récupérer via un appel REST ou une écoute via WebSocket
      this.connectedClients = ['Client1', 'Client2', 'Client3'];
    }

    // Abonnement aux messages entrants (depuis le service WebSocket)
    this.websocketService.onMessage().subscribe((msg: ChatMessage) => {
      // Ici vous pouvez filtrer les messages selon le client sélectionné pour Support
      // Pour un client, on affiche directement tous les messages
      // Pour un support, vous afficherez seulement ceux correspondant à la conversation ouverte
      if (
        this.loggedUser.role !== 'SUPPORT' ||
        (this.loggedUser.role === 'SUPPORT' &&
          msg.sender === this.selectedClient) ||
        (this.loggedUser.role === 'SUPPORT' &&
          msg.receiver === this.selectedClient)
      ) {
        this.messages.push(msg);
      }
    });
  }

  // Envoi d'un message
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: ChatMessage = {
        type: 'CHAT',
        sender: this.loggedUser.username,
        // Pour un SUPPORT, le receiver est le client sélectionné
        receiver: this.loggedUser.role === 'SUPPORT' ? this.selectedClient : '',
        content: this.newMessage,
        timestamp: Date.now(),
      };
      // Envoi via le service WebSocket
      this.websocketService.sendMessage(message);
      // Affichage immédiat dans l'interface
      this.messages.push(message);
      this.newMessage = '';
    }
  }

  // Pour un utilisateur SUPPORT, sélection d'un client pour ouvrir la conversation
  selectClient(client: string): void {
    this.selectedClient = client;
    // Ici, vous pouvez éventuellement charger l'historique de conversation du client sélectionné.
    this.messages = []; // Pour simplifier, nous vidons la zone de chat et démarrons une conversation neuve.
  }
}
