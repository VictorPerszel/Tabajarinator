import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvaliaListaComponent } from './avalia/avalia-lista/avalia-lista.component';
import { AvaliaJogadorComponent } from './avalia/avalia-jogador/avalia-jogador.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'avaliar', component: AvaliaListaComponent, canActivate: [authGuard]},
  {path: 'avaliar/:id', component: AvaliaJogadorComponent, canActivate: [authGuard]},
  {path: 'calculadora', component: CalculadoraComponent},
  {path: 'registrar', component: RegisterComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
