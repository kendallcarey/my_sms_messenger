import {inject, Injectable} from '@angular/core';
import {Message} from '../components/interfaces/message';
import {BehaviorSubject} from 'rxjs';
import {MessageApiService} from './message-api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageService = inject(MessageApiService);
  messageSubscription: any;
  private _message$  = new BehaviorSubject<Message[]>([])
  public readonly message$ = this._message$.asObservable();

  constructor() {
    this.updateMessages()
  }

  updateMessages() {
    this.messageSubscription = this.messageService.getAllMessages().subscribe(messageList => {
      this._message$.next(messageList)
    })
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
