import { RouterOutlet, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, RouterLink, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }
  // Check if Logged in on load
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Check if the user is logged in
  checkLoginStatus(): void {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
  }

  // Logout the user
  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;  // Update the status
    this.router.navigate(['/login']);  // Redirect to login page
  }


}
