import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.module';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;
  private _id!: number;
  constructor(private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router) { }

  ngOnInit(): void {
    //Angular 2
    // const id = +this._route.snapshot.params['id'];
    //Angular 4 and above
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id')!;
      this.employee = this._employeeService.getEmployee(this._id);
    });
  }


  viewNextEmployee(): void {
    if(this._id>6){
      this._id=0;
    this._id = this._id + 1;
    this._router.navigate(['/employees', this._id])
  }else{
    this._id = this._id + 1;
    this._router.navigate(['/employees', this._id])
  }
}
}
