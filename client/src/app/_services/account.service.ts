import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Jogador } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<Jogador | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: Jogador) {
    return this.http.post<Jogador>(this.baseUrl + 'account/login', model).pipe(
      map((response: Jogador) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<Jogador>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));          
        }
      })
    )
  }

  setCurrentUser(user: Jogador) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
