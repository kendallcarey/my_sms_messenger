import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {MessageComponent} from '../message/message.component';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MessageApiService} from '../../services/message-api.service';
import {Message} from '../interfaces/message';

@Component({
  selector: 'app-message-list',
  imports: [
    CommonModule,
    MessageComponent,
    MatCardModule
  ],
  templateUrl: './message-list.component.html',
  standalone: true,
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  @Input() messageList: Message[] = [];
  @ViewChild('scrollableDiv', { static: false }) private scrollableDiv: ElementRef = new ElementRef(null);

  constructor() {

  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollableDiv.nativeElement.scrollTop = this.scrollableDiv.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
