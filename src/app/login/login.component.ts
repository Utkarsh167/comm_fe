import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
// import {AdminService} from 'src/app/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  user:any;

    constructor(private fb: FormBuilder,
      //  public authService: AuthService,
    public router: Router,
    private notification: NzNotificationService,
    // private admin_service:AdminService,

    ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    })
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) return
    // this.user.email=this.email.value;
    // this.user.password=this.password.value;

    // this.admin_service.getLoginDetails(this.form.value)
    // .subscribe(
    //     data => {
    //       console.log(data);
    //       if(data.status!=0){
    //       localStorage.setItem('user', JSON.stringify(this.form.value));              
    //       console.log(data.result.name);
    //       this.router.navigate(['dashboard/weather']);

    //       this.notification.success(
    //         'Logged In',
    //         'You have successfully logged in to Tranfarm Iot platform!',
    //       )
    //       console.log(localStorage.getItem('user'));        
    //    // }
    //     }
    //      else{
    //       this.notification.error(
    //         'Wrong Credentials !',
    //         'Please enter valid email and password',
    //       )
    // }
    //     },
    //     error => {
    //         console.log(error);
    //         this.notification.error(
    //           'Error',
    //           error,
    //         )
    //     });

    
  }
}
