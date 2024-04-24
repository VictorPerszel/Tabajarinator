import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

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
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JogadorCartaComponent } from './avalia/jogador-carta/jogador-carta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    AvaliaListaComponent,
    AvaliaJogadorComponent,
    CalculadoraComponent,
    NotFoundComponent,
    ServerErrorComponent,
    JogadorCartaComponent
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
