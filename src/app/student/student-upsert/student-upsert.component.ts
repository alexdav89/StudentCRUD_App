import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Student, StudentService } from '../../core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
declare var DateRangePicker: any;
@Component({
  selector: 'student-upsert',
  templateUrl: './student-upsert.component.html',
  styleUrls: ['./student-upsert.component.css']
})
export class StudentUpsertComponent implements OnInit {
studentForm: FormGroup;
studentId:string;
dateIsValid:boolean = false;
studentIdIsUnique:boolean = true;
student:Student;
errors:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService:StudentService,
    private fb: FormBuilder
  ){
    this.studentForm = this.fb.group({
      id:new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
      gender:new FormControl('', [Validators.required]),
      birthDate:new FormControl('', [
        Validators.required])
    });
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      if(params['id']){
        this.studentId = params['id'];
        this.studentService.get(this.studentId).subscribe(data => {
          this.student = data;
          this.student.birthDate = moment(this.student.birthDate).format("yyyy-MM-DD");//moment(moment(this.student.birthDate).format("MM/DD/yyyy")).toDate();
          this.onDateChange();
          this.studentForm.patchValue(data);
        });
      }
    });
  }
  validateStudentId(){
    if(this.studentForm.get("id").value){
      this.studentService.get(this.studentForm.get("id").value).subscribe(data => {
        if(data)
          this.studentIdIsUnique = false;
        else
          this.studentIdIsUnique = true;
      });
    }
  }

  saveStudent(){
    this.student = {
      id:null,
      firstName:null,
      lastName:null,
      gender:null,
      birthDate:null
    };
    if(this.studentForm.invalid)
      return;
    // update the model
    this.updateStudent(this.studentForm.value);
    // post the changes
    if(this.studentId){
      this.studentService.update(this.student).subscribe(
          exam => this.router.navigateByUrl(`/students`),
          err => {
            this.errors = err;
          }
        );
    }
    else{
        this.studentService.add(this.student).subscribe(
          exam => this.router.navigateByUrl(`/students`),
          err => {
            this.errors = err;
          }
        );
    }

  }

  onDateChange(){
    console.log(this.studentForm.get("birthDate").value);
    const diff = moment(new Date(),'yyyy-MM-dd').diff(moment(this.studentForm.get("birthDate").value),'y');
    if(diff < 16)
      this.dateIsValid = false;
    else
      this.dateIsValid = true;
  }

  updateStudent(values: Object) {
    Object.assign(this.student, values);
  }

  formatDate(d:Date){
    return moment(d).format("YYYY-MM-DD HH:mm:ss");
  }



}
