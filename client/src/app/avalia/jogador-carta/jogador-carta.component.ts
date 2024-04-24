import { Component, Input } from '@angular/core';
import { Jogador } from 'src/app/_models/jogador';

@Component({
  selector: 'app-jogador-carta',
  templateUrl: './jogador-carta.component.html',
  styleUrls: ['./jogador-carta.component.css']
})
export class JogadorCartaComponent {
  @Input() jogador: Jogador | undefined;
}
