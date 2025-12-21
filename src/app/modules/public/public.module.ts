import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../../shared/material/material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
declarations: [HomeComponent],
imports: [CommonModule, PublicRoutingModule, MaterialModule,SharedModule ]
})
export class PublicModule {}