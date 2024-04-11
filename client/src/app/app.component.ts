import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Jogador } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  jogadores: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getJogadores();
    this.setJogadorAtual();
  }

  getJogadores() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.jogadores = response,
      error: error => console.log(error),
      complete: () => console.log('Deu boa')
    })
  }

  setJogadorAtual() {
    const jogadorStr = localStorage.getItem('jogador');
    if (!jogadorStr) return;
    const jogador: Jogador = JSON.parse(jogadorStr);
    this.accountService.setCurrentUser(jogador);
  }

}
