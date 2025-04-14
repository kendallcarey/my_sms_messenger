import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MessageListComponent} from '../message-list/message-list.component';
import {Message} from '../interfaces/message';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-message-history',
  imports: [
    CommonModule,
    MatCardModule,
    MessageListComponent
  ],
  templateUrl: './message-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styleUrl: './message-history.component.scss'
})
export class MessageHistoryComponent implements OnInit {
  messageService = inject(MessageService);
  messageList= signal<Message[]>([])
  count = signal<number>(0);

  constructor() {

  }

  ngOnInit(): void {
    this.messageService.message$.subscribe(messageList => {
      this.messageList.set(messageList)
      this.count.set(this.messageList().length)
    });
  }

}
