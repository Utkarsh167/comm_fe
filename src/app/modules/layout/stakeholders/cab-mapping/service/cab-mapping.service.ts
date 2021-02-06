import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CAB_LIST, VENDOR, DRIVER_SEARCH, CAB_MAPPING, CAB_DRIVER_MAPPING, COMPANY_SHIFT, CAB } from '../../../../../constant/urls';
import { UNASSIGN_DRIVER, DRIVER_UNASSIGNED } from '../../../../../constant/messages';

@Injectable()
export class CabMappingService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getMappingForm() {
    return this._formBuilder.group({
      "driverId": this._formService.getControl('name'),
      "vendorId": this._formService.getControl('dropdown', false),
      "cabId": this._formService.getControl('dropdown'),
      // "shift": this._formService.getControl('dropdown'),
      // "shiftType": this._formService.getControl('dropdown'),
    })
  }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'status', 'seatingCapacity', 'vendorId']))
  }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
      status: {
        label: 'Status',
        list: [
          { viewValue: 'Active', value: 'unblocked' },
          { viewValue: 'Blocked', value: 'blocked' }
        ],
        control: form.controls.status
      },
      assigned: {
        label: 'Assigned Status',
        list: [
          { viewValue: 'Assigned', value: true },
          { viewValue: 'Unassigned', value: false }
        ],
        control: form.controls.assigned
      }
    }
  }

  getMappedCabs(data) {
    return this._http.get<any>(CAB_DRIVER_MAPPING, data);
  }

  getCabs(data) {
    return this._http.get<any>(CAB_LIST, data);
  }

  getFilteredCabs(data) {
    return this._http.get<any>(CAB, data);
  }

  getAllShifts() {
    return this._http.get<any>(COMPANY_SHIFT);
  }


  // searchVendor(searchKey) {
  //   return this._http.get<Vendor.Detail[]>(VENDOR, { searchKey }, false);
  // }

  searchVendor() {
    return this._http.get<Vendor.Detail[]>(VENDOR, false);
  }

  searchDriver(searchKey) {
    return this._http.get<Driver.Detail[]>(DRIVER_SEARCH, { searchKey }, false);
  }

  addMapping(data) {
    return this._http.put<any>(CAB_MAPPING, data);
  }

  async deleteMapping(body, cab) {
    try {

      let data = {
        message: UNASSIGN_DRIVER(cab.driverMapped.name, cab.cabModel)
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = await this._http.put<any>(CAB_MAPPING, body).toPromise();
        this._utilityService.showAlert(DRIVER_UNASSIGNED)
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  showAlert(message) {
    this._utilityService.showAlert(message);
  }
}
