import {Component, inject, Inject} from '@angular/core';
import {MessageFormComponent} from '../../forms/message-form/message-form.component';
import {MessageHistoryComponent} from '../message-history/message-history.component';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    MessageFormComponent,
    MessageHistoryComponent,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthService)
  localStorageService = inject(LocalStorageService)

  constructor(private router: Router) {
  }

  logOut() {
    this.authService.logOut().subscribe({
      next: (response: Object) => {
        // Handle successful update (optional)
        console.log('log out successful for user', response)

        this.localStorageService.removeItem("token")
        this.router.navigate(['auth/login'])
      },
      error: (error: string) => {
        // Handle error during update
        console.error('create failed', error);
      }
    })
  console.log("log out!")
  }
}
