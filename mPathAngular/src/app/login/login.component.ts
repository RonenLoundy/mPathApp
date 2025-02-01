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
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Check if the user is already logged in
  checkLoginStatus(): void {
    const token = this.authService.getToken();
    if (token) {
      this.isLoggedIn = true;
      // Optionally, redirect to the dashboard or homepage
      this.router.navigate(['/patients']);
    } else {
      this.isLoggedIn = false;
    }
  }
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