import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { USER_LIST } from '../../../../../../constant/urls';

@Injectable({
  providedIn: 'root'
})
export class EmployeeArchiveService {

  constructor(
    private _http: HttpService,
  ) { }

  getArchivedEmployees(data) {
    return this._http.get<Employee.List>(USER_LIST, data);
  }
}
