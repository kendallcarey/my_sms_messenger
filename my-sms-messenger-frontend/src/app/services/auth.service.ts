import {inject, Injectable, signal} from '@angular/core';
import {catchError} from 'rxjs/internal/operators/catchError';
import {throwError} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {User} from '../components/interfaces/user';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorageService = inject(LocalStorageService)
  auth_token  = signal<string>("")
  private url = `${environment.apiUrl}`;
  http = inject(HttpClient);
  httpOptions = {}
  constructor() {
    const auth_token = this.localStorageService.getItem('token');

    if (auth_token && auth_token !== 'undefined') {
      try {
        this.auth_token.set(auth_token);

        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + this.auth_token()
          })
        };
      } catch (e) {
        console.error('Failed to parse liked monologues from localStorage:', e);
      }
    }
  }

  register(userInfo: {email: string, password: string}) {
    let loginUrl = `${this.url}/users`
    return this.http.post<Object>(loginUrl, userInfo, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('An error occurred during createMessage', error);
          return throwError(() => error);
        })
      );
  }

  logOut() {
    let loginUrl = `${this.url}/sessions/` + this.auth_token();

    return this.http.delete<Object>(loginUrl, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('An error occurred during login out', error);
          return throwError(() => error);
        })
      );
  }


  login(userInfo: {email: string, password: string}) {
    let loginUrl = `${this.url}/sessions`
    return this.http.post<{[key: string]: string}>(loginUrl, userInfo, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('An error occurred during login-form', error);
          return throwError(() => error);
        })
      );
  }

  isLoggedIn() {
    return !!this.auth_token();
  }
}
