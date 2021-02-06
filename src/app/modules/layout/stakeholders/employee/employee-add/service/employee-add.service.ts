import { Injectable } from "@angular/core";
import { FormService } from "../../../../../shared/services/form.service";
import { FormBuilder } from "@angular/forms";
import { HttpService } from "../../../../../shared/services/http.service";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { UtilityService } from "../../../../../shared/services/utility.service";
import { COMMON_MESSAGES } from "../../../../../../constant/messages";
import {
  ADD_EMPLOYEE,
  USER_DETAIL,
  COMPANY_SHIFT,
  CHECK_EMPLOYEE_NUMBER_UNIQUE
} from "../../../../../../constant/urls";

@Injectable()
export class EmployeeAddService {
  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService
  ) {}

  createEmployeeForm() {
    return this._formBuilder.group({
      name: this._formService.getControl("name"),
      email: this._formService.getControl("email"),
      mobileNo: this._formService.getControl("phone"),
      employeeId: this._formService.getControl("alphaNumeric"),
      gender: this._formService.getControl("name"),
      shift: this._formService.getControl("dropdown"),
      fullAddress: "",
      houseNo: "",
      roadName: "",
      city: "",
      state: "",
      landMark: "",
      latitude: "",
      longitude: ""
    });
  }

  addEmployee(data) {
    let apiType = data.empId ? "put" : "post";
    return this._http[apiType](ADD_EMPLOYEE, data).pipe(
      map(response => {
        this._uitilityService.showAlert(
          COMMON_MESSAGES[data.empId ? "UPDATED" : "ADDED"]("Employee")
        );
        return response;
      }),
      catchError(error => throwError(error))
    );
  }

  getEmployeeDetail(userId) {
    return this._http.get<any>(USER_DETAIL, { userId });
  }

  checkEmployeeNoUnique(data: object) {
    return this._http.get<any>(CHECK_EMPLOYEE_NUMBER_UNIQUE, data, false);
  }

  getAllShifts() {
    return this._http.get<any>(COMPANY_SHIFT);
  }
}
