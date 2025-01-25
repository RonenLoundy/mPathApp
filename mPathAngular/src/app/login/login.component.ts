import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
}
