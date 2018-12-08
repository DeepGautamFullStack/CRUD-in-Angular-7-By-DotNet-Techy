import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ToastaModule} from 'ngx-toasta'
import {HttpClientModule} from "@angular/common/http";
 import { FormsModule,ReactiveFormsModule,Validator,FormControl,FormGroup,FormBuilder} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    ToastaModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
