import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Department } from '../models/department.module';
import { Employee } from '../models/employee.module';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  name: string = "";
  email: string = "";
  gender: string = "";
  phoneNumber: number = NaN;
  contactPreference: string = "";
  isActive: boolean = true;
  // department: number = 1;
  dateOfBirth: Date = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  photoPath: string = "";
  previewPhoto: boolean = false;

  password:string="";
  confirmPassword:string="";

  department: Department[] = [
    { id: 1, name: "Batter" },
    { id: 2, name: "Bowler" },
    { id: 3, name: "All Rounder" },
    { id: 4, name: "Wicket Keeper" }
  ];

  employee: Employee = {
    id: 0,
    name: this.name,
    gender: this.gender,
    email: undefined,
    phoneNumber: undefined,
    contactPreference: this.contactPreference,
    dateOfBirth: this.dateOfBirth,
    department: "",
    isActive: this.isActive,
    photoPath: undefined,
    password: this.password,
    confirmPassword: this.confirmPassword,
  }
  constructor(private _employeeService:EmployeeService,
              private _router: Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        // dateInputFormat: 'yyyy-MM-dd'
      })
  }

  ngOnInit(): void {
  }

  togglePhotoView(photoPath: string) {
    this.previewPhoto = !this.previewPhoto;
  }

  saveEmployee(): void {
    console.log(this._employeeService);
    this._employeeService.saveEmployee(this.employee);
    this._router.navigate(['list']);
  }
}
