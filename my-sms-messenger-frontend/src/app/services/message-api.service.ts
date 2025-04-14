import {Injectable, inject, ChangeDetectorRef} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError} from 'rxjs/internal/operators/catchError';
import {throwError} from 'rxjs';
import {Message} from '../components/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageApiService {
  private url = `${environment.apiUrl}/messages`;
  http = inject(HttpClient);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };
  constructor() {}

  getAllMessages() {
    return this.http.get<Message[]>(`${this.url}`)
  }

  createMessage(message: {phoneNumber: string, text: string}) {
    let createUrl = `${this.url}`
    return this.http.post<Message>(createUrl, {message: message}, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('An error occurred during createMessage', error);
          return throwError(() => error);
        })
      );

  }
}
