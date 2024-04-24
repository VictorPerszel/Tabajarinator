import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  jogadores: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
    this.setJogadorAtual();
  }

  setJogadorAtual() {
    const jogadorStr = localStorage.getItem('jogador');
    if (!jogadorStr) return;
    const jogador: User = JSON.parse(jogadorStr);
    this.accountService.setCurrentUser(jogador);
  }

}
