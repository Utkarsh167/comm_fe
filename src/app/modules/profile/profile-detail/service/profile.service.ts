import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../constant/messages';
import { ADMIN_DETAIL, ADMIN } from '../../../../constant/urls';
import { map, catchError, } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  static profileData: any;

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }


  getProfileDetails(refresh = false) {
    return new Observable<any>((observer) => {
      if (ProfileService.profileData && !refresh) {
        observer.next(ProfileService.profileData)
      } else {
        this._http.get<profile.Detail>(ADMIN_DETAIL).subscribe(
          data => {
            ProfileService.profileData = { ...data };
            observer.next(data);
          }, error => {
            observer.error(error);
          }
        )
      }
    })
  }

  editProfile(data) {
    let apiType = 'put';
    return this._http[apiType](ADMIN, data).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['UPDATED']('Profile'));
          // response = ProfileService.profileData
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }
}
