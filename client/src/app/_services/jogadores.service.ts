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
    return this.http.get<Jogador[]>(this.baseUrl + 'jogadores')
  }

  getJogador(usuario: string) {
    return this.http.get<Jogador>(this.baseUrl + 'jogadores/' + usuario)
  }

}
