import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from "./app-routing.module"
import { ReactiveFormsModule} from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"

import { BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { MatButtonModule } from "@angular/material"
import { MatIconModule } from "@angular/material"
import { MatInputModule } from "@angular/material"
import { MatFormFieldModule } from "@angular/material"
import { MatProgressSpinnerModule } from "@angular/material"

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { GlobalService } from "./services/global.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
