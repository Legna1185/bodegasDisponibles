import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module'


@NgModule({
declarations: [AppComponent, HeaderComponent],
imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule, MaterialModule,SharedModule],
bootstrap: [AppComponent]
})
export class AppModule {}