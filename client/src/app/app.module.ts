import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AvaliaListaComponent } from './avalia/avalia-lista/avalia-lista.component';
import { AvaliaJogadorComponent } from './avalia/avalia-jogador/avalia-jogador.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { SharedModule } from './_modules/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    AvaliaListaComponent,
    AvaliaJogadorComponent,
    CalculadoraComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
