import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceListService } from '../service/service-list.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { invalidFileError } from 'src/app/constant/messages';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.scss']
})
export class ShiftListComponent implements OnInit, AfterViewInit {

  @ViewChild('upload_csv', { static: false })
  myInputVariable: ElementRef;
  requestTabChange: any;
  currentTabChange: any;
  historyTabChange: any;
  csvFileName: string = '';
  menu = false;
  
  constructor(private _serviceList: ServiceListService,
    private _utilityService: UtilityService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  tabRefresh(event) {
    this.requestTabChange = false;
    this.currentTabChange = false;
    this.historyTabChange = false;

    if (event.index == 0) {
      this.requestTabChange = true;
    }
    else if (event.index == 1) {
      this.currentTabChange = true;
    }
    else if (event.index == 2) {
      this.historyTabChange = true;
    }
  }

  async uploadCSV(e) {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._serviceList.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = '';
            // console.log("inside");
            this._router.navigate(['admin/shift/list']);
            this.requestTabChange = true;
          }
        },
        err => {

        }
      )
    }
    else {
      this._utilityService.showAlert(invalidFileError('only xls  file allowed'));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = '';
    this.myInputVariable.nativeElement.value = "";
  }

}
