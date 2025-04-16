import {Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-form.component.html',
  standalone: true,
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  authService = inject(AuthService);
  localStorageService = inject(LocalStorageService)
  signUpForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  constructor(private router: Router) {
  }

  createUser() {
    console.log("submit message!")
    let body = {
      email: this.signUpForm.value.email ?? '',
      password: this.signUpForm.value.password ?? ''
    }

    this.authService.register(body).subscribe({
      next: (response) => {
        // Handle successful update (optional)
        console.log('create successful for message', response)
        this.router.navigate(['auth/login'])
      },
      error: (error) => {
        // Handle error during update
        console.error('create failed', error);
      }
    })
  }
}
