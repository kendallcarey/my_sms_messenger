import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../interfaces/message';
import {MatCard, MatCardContent, MatCardModule} from '@angular/material/card';
import {PhoneFormatPipe} from '../../pipes/phone-format.pipe';

@Component({
  selector: 'app-message',
  imports: [CommonModule, MatCardModule, PhoneFormatPipe],
  templateUrl: './message.component.html',
  standalone: true,
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message: Message | null = null;
}
