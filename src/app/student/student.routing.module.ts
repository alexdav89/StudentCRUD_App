import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentUpsertComponent } from './student-upsert/student-upsert.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: 'add',
    component: StudentUpsertComponent
  },
  {
    path: ':id/update',
    component: StudentUpsertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
