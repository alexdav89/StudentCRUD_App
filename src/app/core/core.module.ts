import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ApiService,
  StudentService
} from './services';

@NgModule({
  imports: [
  CommonModule
  ],
  providers: [
    ApiService,
    StudentService
  ],
  declarations: []
})
export class CoreModule { }
