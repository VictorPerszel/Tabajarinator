import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvaliaListaComponent } from './avalia/avalia-lista/avalia-lista.component';
import { AvaliaJogadorComponent } from './avalia/avalia-jogador/avalia-jogador.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'avaliar', component: AvaliaListaComponent, canActivate: [authGuard]},
  {path: 'avaliar/:id', component: AvaliaJogadorComponent, canActivate: [authGuard]},
  {path: 'calculadora', component: CalculadoraComponent},
  {path: 'registrar', component: RegisterComponent},
  {path: '**', component: AvaliaListaComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
