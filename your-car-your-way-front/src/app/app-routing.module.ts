import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';
import { LoginComponent } from './features/login/login.component';
import { YcywComponent } from './features/ycyw/ycyw.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Route par défaut.
  { path: 'chat', component: ChatComponent }, // Route pour le chat.
  { path: 'ycyw', component: YcywComponent }, // Route pour la page principale.
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirection vers la page de connexion.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
