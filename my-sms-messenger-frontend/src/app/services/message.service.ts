import {ChangeDetectorRef, inject, Injectable, signal, SimpleChanges} from '@angular/core';
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
      // this.ref.detectChanges()
      // this.count.set(this.messageList().length)
    })
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger
  }
}
