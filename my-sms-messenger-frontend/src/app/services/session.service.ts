import {inject, Injectable, signal} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  localStorageService = inject(LocalStorageService)
  sessionId  = signal<string>("")

  constructor() {
    const sessionId = this.localStorageService.getItem('sessionId');

    if (sessionId && sessionId !== 'undefined') {
      try {
        this.sessionId.set(sessionId);
      } catch (e) {
        console.error('Failed to parse session id from localStorage:', e);
      }
    } else if (sessionId == 'undefined' || sessionId == '') {
      const myUuid = uuidv4();
      this.localStorageService.setItem('sessionId', myUuid)
      this.sessionId.set(myUuid);
    }
  }
}
