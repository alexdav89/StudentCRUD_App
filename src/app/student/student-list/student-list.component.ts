import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { StudentService } from '../../core';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import SearchStudentDto from './../../core/models/SearchStudentDto';

declare var $: any;
@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  students:any;
  total:number=0;
  currentPage:number = 1;
  pageSize:number = 5;
  searchForm: FormGroup;
  loading:boolean = false;
  searchModel:SearchStudentDto;
  constructor(
    private studentService:StudentService,
    private fb: FormBuilder
  ){
    this.initSearchModel();
    this.searchForm = this.fb.group({
      id:new FormControl(''),
      searchTerms: new FormControl(''),
      gender:new FormControl(''),
      startBirthDate:new FormControl('', ),
      endBirthDate:new FormControl('', )
    });

  }

  ngOnInit(){
    this.searchStudents();
  }

  searchStudents(){
    this.loading = true;
    Object.assign(this.searchModel, this.searchForm.value);
    this.searchModel.pageIndex = this.currentPage;
    this.searchModel.pageSize = this.pageSize;
    this.studentService.searchStudents(this.searchModel).subscribe(data => {
      this.students = data;
      this.total = data.total;
      this.loading = false;
    });
  }

  deleteStudent(id:string){
    if(confirm("წავშალო სტუდენტი ?")){
      this.studentService.delete(id).subscribe(data => {
        this.currentPage = 1;
        this.searchStudents();
      });
    }
  }

  initSearchModel(){
    this.currentPage = 1;
    this.pageSize = 10;
    this.searchModel = {
      pageIndex:this.currentPage,
      pageSize:this.pageSize,
      searchTerms:null,
      gender:null,
      startBirthDate:null,
      endBirthDate:null
    };
  }


  formatDate(d:Date){
    return moment(d).format("DD MMM, yyyy");
  }



}
