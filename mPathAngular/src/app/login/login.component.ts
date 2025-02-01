import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }
  // On load check if logged in
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Check if the user is already logged in if so send to patients page
  checkLoginStatus(): void {
    const token = this.authService.getToken();
    if (token) {
      this.isLoggedIn = true;
      this.router.navigate(['/patients']);
    } else {
      this.isLoggedIn = false;
    }
  }
  // On login button send info to backend through service to check if information is correct
  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        alert('Login successful!');
        window.location.reload();  // Refresh the page after login
      },
      error: () => {
        alert('Login failed.');
      }
    });
  }
}