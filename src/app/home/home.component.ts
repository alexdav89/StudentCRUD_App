import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../core/services/student.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentExams:any[];
  popularExams:any[];

  constructor(
    private router: Router,
    private studentService:StudentService
  ) {}



  ngOnInit() {


  }
}
