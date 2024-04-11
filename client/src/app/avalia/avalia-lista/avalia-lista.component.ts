import { Component } from '@angular/core';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-avalia-lista',
  templateUrl: './avalia-lista.component.html',
  styleUrls: ['./avalia-lista.component.css']
})
export class AvaliaListaComponent {
  faCheckCircle = faCheckCircle;
  faCircleX = faCircleXmark;
}
