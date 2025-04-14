import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MessageFormComponent} from './forms/message-form/message-form.component';
import {MessageHistoryComponent} from './components/message-history/message-history.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageFormComponent, MessageHistoryComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'My SMS Messenger';
}
