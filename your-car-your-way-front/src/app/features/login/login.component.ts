import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { AuthSuccess } from 'src/app/interfaces/authSuccess.interface';
import { LoginRequest } from 'src/app/interfaces/LoginRequest.interface';
import { AuthService } from 'src/app/services/auth.service';

const loginErrorMessage =
  'Le login doit être un email valide et contenir au moins 6 caractères.';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Fichier HTML séparé.
  styleUrls: ['./login.component.sass'],
  standalone: false,
})
export class LoginComponent {
  email: string = ''; // email saisi par l'utilisateur.
  password: string = ''; // Mot de passe saisi par l'utilisateur.
  loginError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  getPasswordError(): string {
    if (!this.password) {
      return '';
    }
    if (this.password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    if (!/[A-Z]/.test(this.password)) {
      return 'Le mot de passe doit contenir au moins une majuscule.';
    }
    if (!/\d/.test(this.password)) {
      return 'Le mot de passe doit contenir au moins un chiffre.';
    }
    if (!/[!@#$%^&*]/.test(this.password)) {
      return 'Le mot de passe doit contenir au moins un caractère spécial.';
    }
    return ''; // Si aucune condition n'échoue, pas d'erreur.
  }

  isPasswordValid(): boolean {
    return !this.getPasswordError(); // Le champ est valide si aucune erreur n'est présente.
  }

  getLoginError(): string {
    const minLength = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.email) {
      return '';
    } else if (this.email.length < minLength || !emailRegex.test(this.email)) {
      return loginErrorMessage;
    } else {
      return '';
    }
  }

  isLoginValid(): boolean {
    return !this.getLoginError(); // Le champ est valide si aucune erreur n'est présente.
  }

  // Méthode pour gérer la connexion.

  login() {
    if (!this.isLoginValid()) {
      this.loginError = loginErrorMessage;
      return;
    }

    if (!this.isPasswordValid()) {
      this.loginError =
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.';
      return;
    }
    //const loginRequest = this.form.value as LoginRequest
    const loginData = {
      email: this.email,
      password: this.password,
    } as LoginRequest;

    this.authService
      .login(loginData)
      .pipe(
        tap((response: AuthSuccess) => {
          // Stocke le token dans le localStorage.
          localStorage.setItem('token', response.token);
          // Redirige l'utilisateur vers la page "chat".
          this.router.navigate(['/ycyw']); // Redirige vers la page par défaut de l'application.
        }),
        catchError((error) => {
          // Gère l'erreur et affiche un message.
          this.loginError = 'Identifiants incorrects. Veuillez réessayer.';
          return of(error); // Retourne un Observable pour éviter les interruptions.
        })
      )
      .subscribe();
  }

  openChat() {
    if (!this.email) {
      alert("Veuillez renseigner votre email avant de demander de l'aide.");
    } else {
      // Redirige l'utilisateur vers la page "chat".
      this.router.navigate(['/chat'], { queryParams: { email: this.email } });
    }
  }
}
