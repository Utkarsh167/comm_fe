import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAX_EMP_CAPACITY } from 'src/app/constant/app-constant'
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutePanelService } from '../../service/route-panel.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  maxEmp = MAX_EMP_CAPACITY;
  configurationForm: FormGroup;

  constructor(private _routeService: RoutePanelService,
    public dialogRef: MatDialogRef<ConfigurationComponent>,
    private _formService: FormService,
    private _formBuilder: FormBuilder,
  ) {
    this.createConfigurationForm();
  }

  ngOnInit() {
  }

  /* 
 *****For making configuration form ***
 */
  createConfigurationForm() {
    this.configurationForm = this._formBuilder.group(
      {
        "maxGroupSize": this._formService.getControl('dropdown'),
        "waitTime": this._formService.getControl('dropdown'),
        "maxTripDuration": this._formService.getControl('dropdown'),
      }
    )
  }

  /* 
  *****For getting the all form controls ***
  */
  getControl(control) {
    return this.configurationForm.controls[control];
  }

  /* 
  *****For creating thr group ***
  */
  createGroup() {
    let data = { ...this.configurationForm.value };
    if (this.configurationForm.invalid || this.configurationForm.disabled) {
      return;
    }
    this.configurationForm.disable();
    this._routeService.addGroupConfi(data).subscribe(
      response => {
        if (response && response.statusCode == 200) {
          this.dialogRef.close(true);
        }
      }, err => {
        this.configurationForm.enable();
      }
    )
  }

  /* 
  *****For Closing the model ***
  */
  onNoClick(value?:any): void {
    this.dialogRef.close(value);
  }

}
