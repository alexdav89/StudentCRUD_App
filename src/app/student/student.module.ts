import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule, NgbNavModule, NgbNav} from '@ng-bootstrap/ng-bootstrap';
import { StudentRoutingModule } from './student.routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentUpsertComponent } from './student-upsert/student-upsert.component';

import {
  StudentService
} from '../core/services';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NgbModule,
    StudentRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentService
  ],
  declarations: [
    StudentListComponent,
    StudentUpsertComponent
  ],
  exports:[
    StudentListComponent,
    StudentUpsertComponent
  ]
})
export class StudentModule { }
