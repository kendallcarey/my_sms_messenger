import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MessageApiService} from '../../services/message-api.service';
import {MessageService} from '../../services/message.service';
import {SessionService} from '../../services/session.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-message-form',
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './message-form.component.html',
  standalone: true,
  styleUrl: './message-form.component.scss'
})
export class MessageFormComponent {
  messageApiService = inject(MessageApiService);
  messageService = inject(MessageService);
  // sessionService = inject(SessionService);
  authService = inject(AuthService);
  createMessageForm = new FormGroup({
    phoneNumber: new FormControl<string>(''),
    text: new FormControl<string>('')
  });

  constructor() {
  }

  submitMessage() {
    console.log("submit message!")
    let body = {
      phoneNumber: this.createMessageForm.value.phoneNumber ?? '',
      text: this.createMessageForm.value.text ?? ''
    }

    this.messageApiService.createMessage(body).subscribe({
      next: (response) => {
        // Handle successful update (optional)
        console.log('create successful for message', response)
        this.messageService.updateMessages()
        this.clearForm();
      },
      error: (error) => {
        // Handle error during update
        console.error('create failed', error);
      }
    })
  }

  clearForm() {
    this.createMessageForm.reset()
  }

}
