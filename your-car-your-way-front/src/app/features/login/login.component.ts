import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Fichier HTML séparé.
  styleUrls: ['./login.component.sass'], // Fichier SCSS.
})
export class LoginComponent {
  username: string = ''; // Nom d'utilisateur saisi par l'utilisateur.
  password: string = ''; // Mot de passe saisi par l'utilisateur.
  loginError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  validateLogin() {
    const minLength = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.username) {
      this.loginError = '';
    } else if (
      this.username.length < minLength &&
      !emailRegex.test(this.username)
    ) {
      this.loginError =
        'Le login doit être un email valide ou contenir au moins 6 caractères.';
    } else {
      this.loginError = '';
    }
  }

  validatePassword() {
    if (!this.password) {
      this.passwordError = 'pas de mdp ';
      return;
    }

    if (this.password.length < 8) {
      this.passwordError =
        'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    if (!/[A-Z]/.test(this.password)) {
      this.passwordError =
        'Le mot de passe doit contenir au moins une majuscule.';
      return;
    }

    if (!/\d/.test(this.password)) {
      this.passwordError = 'Le mot de passe doit contenir au moins un chiffre.';
      return;
    }

    if (!/[!@#$%^&*]/.test(this.password)) {
      this.passwordError =
        'Le mot de passe doit contenir au moins un caractère spécial.';
      return;
    }

    this.passwordError = ''; // Aucune erreur si toutes les conditions sont remplies.
  }

  isLoginValid(): boolean {
    const minLength = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format email simple.
    return this.username.length >= minLength || emailRegex.test(this.username);
  }

  isPasswordValid(): boolean {
    return (
      this.password.length >= 8 &&
      /[A-Z]/.test(this.password) &&
      /\d/.test(this.password) &&
      /[!@#$%^&*]/.test(this.password)
    );
  }

  // Méthode pour gérer la connexion.

  login() {
    if (!this.isLoginValid()) {
      this.loginError =
        'Le login doit être un email valide ou contenir au moins 6 caractères.';
      return;
    }

    if (!this.isPasswordValid()) {
      this.loginError =
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.';
      return;
    }

    const isEmail = this.username.includes('@');

    const loginData = isEmail
      ? { email: this.username, password: this.password }
      : { username: this.username, password: this.password };

    this.authService
      .login(loginData)
      .pipe(
        tap((response) => {
          // Redirige l'utilisateur en cas de succès.
          this.router.navigate(['/chat']);
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
    if (!this.username) {
      alert(
        "Veuillez renseigner votre nom OU email avant de demander de l'aide."
      );
    } else {
      this.router.navigate(['/chat']); // Redirige vers le chat.
    }
  }
}
