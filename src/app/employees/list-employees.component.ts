import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.module';
import { EmployeeService } from './employee.service';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees!: Employee[];
  filteredEmployees!: Employee[];
  private _searchTerm: string = "";
  employeeToDisplay!: Employee;
  private arrayIndex: number = 1;
  dataFromChild!: Employee;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchTerm: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }
  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
      this.employees = this._route.snapshot.data['employeeList'];
      if (this._route.snapshot.queryParamMap.has("searchTerm")) {
        this.searchTerm = (this._route.snapshot.queryParamMap.get("searchTerm"))!
      } else {
        this.filteredEmployees = this.employees;
      }
  }
  // employees: Employee[] = [
  //   {
  //     id: 1,
  //     name: 'virat Kohli',
  //     gender: 'Male',
  //     contactPreference: 'Phone',
  //     phoneNumber: 8374994886,
  //     dateOfBirth: new Date('02/06/2000'),
  //     department: 'Batter',
  //     isActive: true,
  //     photoPath: 'assets/images/viratKohli.png'
  //   },
  //   {
  //     id: 2,
  //     name: 'KL Rahul',
  //     gender: 'Male',
  //     contactPreference: 'EMail',
  //     email: 'KLRahul@gmail.com',
  //     dateOfBirth: new Date('07/07/2005'),
  //     department: 'Batter',
  //     isActive: true,
  //     photoPath: 'assets/images/klRahul.png'
  //   },
  //   {
  //     id: 3,
  //     name: 'Hardik Pandya',
  //     gender: 'Male',
  //     phoneNumber: 9701299198,
  //     contactPreference: 'EMail',
  //     email: 'hp@gmail.com',
  //     dateOfBirth: new Date('12/08/2008'),
  //     department: 'All Rounder',
  //     isActive: true,
  //     photoPath: 'assets/images/hardikPandya.png'
  //   },
  //   {
  //     id: 4,
  //     name: 'Jasprit Bumrah',
  //     gender: 'Male',
  //     contactPreference: 'Phone',
  //     email: 'Jaspritb@gmail.com',
  //     dateOfBirth: new Date('07/08/2002'),
  //     department: 'Bowler',
  //     isActive: true,
  //     photoPath: 'assets/images/jaspritBumrah.png'
  //   },
  //   {
  //     id: 5,
  //     name: 'MS Dhoni',
  //     gender: 'Male',
  //     phoneNumber: 9704947524,
  //     contactPreference: 'EMail',
  //     email: 'msd@gmail.com',
  //     dateOfBirth: new Date('06/21/2003'),
  //     department: 'Wicket Keeper',
  //     isActive: true,
  //     photoPath: 'assets/images/msDhoni.png'
  //   },
  //   {
  //     id: 6,
  //     name: 'Mohd Shami',
  //     gender: 'Male',
  //     contactPreference: 'Phone',
  //     email: 'MohdShami@gmail.com',
  //     dateOfBirth: new Date('12/19/2003'),
  //     department: 'Bowler',
  //     isActive: true,
  //     photoPath: 'assets/images/mohammedShami.png'
  //   }
  //   ,
  //   {
  //     id: 7,
  //     name: 'Ravindra Jadeja',
  //     gender: 'Male',
  //     contactPreference: 'EMail',
  //     phoneNumber: 7675805260,
  //     email: 'jadduu@gmail.com',
  //     dateOfBirth: new Date('09/14/2003'),
  //     department: 'All Rounder',
  //     isActive: true,
  //     photoPath: 'assets/images/ravindraJadeja.png'
  //   }
  // ]

  ngOnInit(): void {
    this.employees = this._employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
    this.filteredEmployees = this.employees;
  }

  nextEmployee(): void {
    if (this.arrayIndex < this.employees.length) {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }

  handleNotify(eventData: Employee): void {
    this.dataFromChild = eventData;
    this.dataFromChild.name = eventData.name.toUpperCase();
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    })
  }
}
