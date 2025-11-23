import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { Temp1Component } from './components/temp1/temp1.component';
import { NgParticlesModule } from "ng-particles";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    Temp1Component
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    NgParticlesModule,
    DialogModule,
    ButtonModule
  ]
})
export class TemplatesModule { }
