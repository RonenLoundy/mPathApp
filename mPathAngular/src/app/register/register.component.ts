import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Component({
  selector: 'app-register',
  imports: [HttpClientModule, FormsModule],
  providers: [AuthService], // Provide AuthService and HttpClient

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  // On register button
  onRegister(): void {
    // Use the service to send info to the backend
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed.');
      }
    });
  }
}
