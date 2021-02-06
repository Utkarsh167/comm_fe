import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-assigncab',
  templateUrl: './assigncab.component.html',
  styleUrls: ['./assigncab.component.scss']
})
export class AssigncabComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AssigncabComponent>) { }

  ngOnInit() {
  }
  foods: Food[] = [
    { value: 'Cab1', viewValue: 'Cab 1' },
    { value: 'Cab2', viewValue: 'Cab 2' },
    { value: 'Cab3', viewValue: 'Cab 3' }
  ];
  onNoClick(): void {
    this.dialogRef.close();
  }

}
