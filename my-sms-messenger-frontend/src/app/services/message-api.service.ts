import {Injectable, inject, ChangeDetectorRef} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError} from 'rxjs/internal/operators/catchError';
import {throwError} from 'rxjs';
import {Message} from '../components/interfaces/message';
import {SessionService} from './session.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageApiService {
  authService = inject(AuthService);

  private url = `${environment.apiUrl}/messages`;
  http = inject(HttpClient);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + this.authService.auth_token()
    })
  };
  constructor() {}

  getAllMessages() {
    return this.http.get<Message[]>(`${this.url}`, this.httpOptions)
  }

  createMessage(message: {phoneNumber: string, text: string}) {
    let createUrl = `${this.url}`
    return this.http.post<Message>(createUrl, message, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('An error occurred during createMessage', error);
          return throwError(() => error);
        })
      );

  }
}
