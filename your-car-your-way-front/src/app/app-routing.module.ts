import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';
import { LoginComponent } from './features/login/login.component';
import { YcywComponent } from './features/ycyw/ycyw.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Route par défaut.
  { path: 'chat', component: ChatComponent }, // Route pour le chat après connexion.
  { path: 'ycyw', component: YcywComponent }, // Route pour le chat après connexion.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
