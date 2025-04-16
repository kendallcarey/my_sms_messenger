import {Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  standalone: true,
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  authService = inject(AuthService);
  localStorageService = inject(LocalStorageService)
  loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  constructor(private router: Router) {
  }

  login() {
    console.log("submit message!")
    let body = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    }

    this.authService.login(body).subscribe({
      next: (response) => {
        // Handle successful update (optional)
        console.log('login successful for user', response)

        this.localStorageService.setItem("token", response['token'])
        this.router.navigate([''])
      },
      error: (error) => {
        // Handle error during update
        console.error('create failed', error);
      }
    })
  }
}
