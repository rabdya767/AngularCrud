import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee.module';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  // private _employee!: Employee;

  @Input()
  employee!: Employee;
  // set employee(val: Employee) {
  //   console.log("Previous " + (this._employee ? this._employee.name : 'NULL'));
  //   console.log("Current " + val.name);
  //   this._employee = val;
  // }

  // get employee(): Employee {
  //   return this._employee;
  // }

  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      const from = JSON.stringify(change.previousValue);
      const to = JSON.stringify(change.currentValue);

      // console.log(propName + ' changed ' + from + ' to ' + to);
    }
    // console.log(changes);
    /**
     *first tym
{
    "employee": {
        "currentValue": {
            "id": 1,
            "name": "virat Kohli",
            "gender": "Male",
            "contactPreference": "Phone",
            "phoneNumber": 8374994886,
            "dateOfBirth": "2000-02-05T18:30:00.000Z",
            "department": "Batter",
            "isActive": true,
            "photoPath": "assets/images/viratKohli.png"
        },
        "firstChange": true
    }
}
===================
{
    "employee": {
        "previousValue": {
            "id": 1,
            "name": "virat Kohli",
            "gender": "Male",
            "contactPreference": "Phone",
            "phoneNumber": 8374994886,
            "dateOfBirth": "2000-02-05T18:30:00.000Z",
            "department": "Batter",
            "isActive": true,
            "photoPath": "assets/images/viratKohli.png"
        },
        "currentValue": {
            "id": 2,
            "name": "KL Rahul",
            "gender": "Male",
            "contactPreference": "EMail",
            "email": "KLRahul@gmail.com",
            "dateOfBirth": "2005-07-06T18:30:00.000Z",
            "department": "Batter",
            "isActive": true,
            "photoPath": "assets/images/klRahul.png"
        },
        "firstChange": false
    }
}
 */
  }

  handleClick(): void {
    this.notify.emit(this.employee);
  }
}
