import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RosterListServiceService } from '../../service/roster-list-service.service';
import { FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-delete-cab-mapping',
  templateUrl: './delete-cab-mapping.component.html',
  styleUrls: ['./delete-cab-mapping.component.sass']
})
export class DeleteCabMappingComponent extends Pagination implements OnInit {
  fromDate;
  toDate;

  constructor(public dialogRef: MatDialogRef<DeleteCabMappingComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _RoasterListService: RosterListServiceService) {
    super();
    

  }

  ngOnInit() {
    console.log(this.data);
    this.fromDate = new Date(this.data.fromDate).toLocaleDateString();
    this.toDate = new Date(this.data.toDate).toLocaleDateString();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCabMapping(){
    console.log(this.data);
    // let data = {
    //   routeId: this.data.routeBadge,
    //   cabId: this.data.cab._id
    // }
    this._RoasterListService.deleteCabMapping(this.data).subscribe(response => {
      if (response) {
        this.dialogRef.close(true);
      }

    })
  }

}
