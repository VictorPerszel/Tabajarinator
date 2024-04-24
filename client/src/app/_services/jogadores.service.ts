import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Jogador } from '../_models/jogador';

@Injectable({
  providedIn: 'root'
})
export class JogadoresService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJogadores() {
    return this.http.get<Jogador[]>(this.baseUrl + 'jogadores', this.getHttpOptions())
  }

  getJogador(usuario: string) {
    return this.http.get<Jogador>(this.baseUrl + 'jogadores/' + usuario, this.getHttpOptions())
  }

  getHttpOptions() {
    const loginStr = localStorage.getItem('jogador');
    if (!loginStr) return;

    const login = JSON.parse(loginStr);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + login.token
      })
    }
  }
}
