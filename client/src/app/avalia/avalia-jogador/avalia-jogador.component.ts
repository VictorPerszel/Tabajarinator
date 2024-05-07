import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jogador } from 'src/app/_models/jogador';
import { JogadoresService } from 'src/app/_services/jogadores.service';

@Component({
  selector: 'app-avalia-jogador',
  templateUrl: './avalia-jogador.component.html',
  styleUrls: ['./avalia-jogador.component.css']
})
export class AvaliaJogadorComponent implements OnInit {
  
  jogador: Jogador | undefined;

  constructor(private jogadorService: JogadoresService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.carregaJogador();
  }

  carregaJogador() {
    const jogadorStr = this.route.snapshot.paramMap.get('jogador');
    console.log(jogadorStr)
    if (!jogadorStr) return;
    this.jogadorService.getJogador(jogadorStr).subscribe({
      next: jogador => this.jogador = jogador
    })
  }
}
