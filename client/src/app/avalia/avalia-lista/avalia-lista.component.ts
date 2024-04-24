import { Component } from '@angular/core';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Jogador } from 'src/app/_models/jogador';
import { JogadoresService } from 'src/app/_services/jogadores.service';

@Component({
  selector: 'app-avalia-lista',
  templateUrl: './avalia-lista.component.html',
  styleUrls: ['./avalia-lista.component.css']
})
export class AvaliaListaComponent {
  faCheckCircle = faCheckCircle;
  faCircleX = faCircleXmark;

  jogadores: Jogador[] = [];

  constructor(private jogadoresService: JogadoresService) {}  

  ngOnInit(): void {
     this.carregarJogadores();
  }

  carregarJogadores() {
    this.jogadoresService.getJogadores().subscribe({
      next: jogadores => this.jogadores = jogadores
    })
  }
}
