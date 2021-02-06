import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FormService } from '../../../shared/services/form.service';
import { LOGIN, ADMIN_DETAIL } from 'src/app/constant/urls';
import { map, catchError } from 'rxjs/operators';
import { DataTransferService } from '../../../shared/services/data-transfer.service';
import { ADMIN } from '../../../../constant/routes';
import { NgxPermissionsService } from 'ngx-permissions';
import { DASHBOARD, ADMIN_PROFILE } from 'src/app/constant/absolute-routes';

@Injectable()
export class LoginService {

    constructor(
        private _formBuilder: FormBuilder,
        private _http: HttpService,
        private _utilityService: UtilityService,
        private _router: Router,
        private _formService: FormService,
        private _dataTransferService: DataTransferService,
        private permissionsService: NgxPermissionsService
    ) { }

    /*
        Method For Creating Login Form
    */
    createLoginForm() {
        return this._formBuilder.group(
            {
                email: this._formService.getControl('email'),
                password: this._formService.getControl('password')
            }
        )
    }

    /*
        Method For Calling Login API
    */
    login(data) {
        data = this._utilityService.trim(data);
        data['deviceToken'] = localStorage.getItem('fleet-firebase-token');
        data['deviceId'] = Math.floor(Math.random() * 1000000000).toString();
        if (!data.deviceToken) {
            delete data.deviceToken;
        }
        return this._http.post(LOGIN, data).pipe(
            map(
                response => {
                    this.loginSuccess(response.data);
                    return response;
                }
            ),
            catchError(
                err => throwError(err)
            )
        )
    }
    /*
        Method For Login
    */
    loginSuccess(data) {
        this.permissionsService.addPermission(data.adminObject.permission);
        this.permissionsService.loadPermissions(data.adminObject.permission);
        localStorage.setItem('fleet-admin-token', data['accessToken']);
        localStorage.setItem('fleet-admin-role', data.adminObject.adminType);
        localStorage.setItem('fleet-admin-name', data.adminObject.name);
        localStorage.setItem('fleet-admin-id', data.adminObject._id);
        localStorage.setItem('adminPermission', JSON.stringify(data.adminObject.permission));
        this._dataTransferService.profileData = data.adminObject;
        if (data.adminObject.isProfileComplete) {
            this._router.navigate([`${DASHBOARD}`]);
        }
        else {
            this._router.navigate([`${ADMIN_DETAIL}`]);
        }

    }
}
