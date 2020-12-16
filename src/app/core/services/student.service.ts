import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Student } from '../models';
import { map } from 'rxjs/operators';
import SearchStudentDto from '../models/SearchStudentDto';

@Injectable()
export class StudentService {
  constructor (
    private apiService: ApiService
  ) {}

  searchStudents(searchInputs:SearchStudentDto):Observable<{total:number, currentPage:number, pageSize:number, result:any[]}>{
    return this.apiService.post(`/Student/search`, searchInputs);
  }

  get(id): Observable<any> {
    return this.apiService.get('/student/get-one/' + id)
      .pipe(map(data => data));
  }

  delete(id) {
    return this.apiService.delete('/student/delete-one?id=' + id);
  }

  add(student): Observable<any> {
      return this.apiService.post('/student/add-one', student)
        .pipe(map(data => data));
  }

  update(student): Observable<any> {
      return this.apiService.put('/student/update-one', student)
        .pipe(map(data => data));
  }

}
