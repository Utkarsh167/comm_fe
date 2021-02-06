import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-validate-merge',
  templateUrl: './validate-merge.component.html',
  styleUrls: ['./validate-merge.component.scss']
})
export class ValidateMergeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ValidateMergeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  merge(value) {
    this.dialogRef.close(value);
  }

  /* 
  *****For Closing the model ***
  */
  onNoClick(value): void {
    this.dialogRef.close(value);
  }

}
