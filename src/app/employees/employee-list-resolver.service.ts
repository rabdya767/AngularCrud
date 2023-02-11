import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Employee } from "../models/employee.module";
import { EmployeeService } from "./employee.service";

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[]>{
    constructor(private _employeeService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Employee[] | Observable<Employee[]> | Promise<Employee[]> {
        return this._employeeService.getEmployees()
    }
}