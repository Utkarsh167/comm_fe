import { Component, OnInit } from '@angular/core';
// import RequestListService, Pagination Shivakumar A
import { RequestListService } from "../../requests-list/service/request-list.service";
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})

// Extend pagination to class - Shivakumar A
export class RequestsListComponent extends Pagination implements OnInit {

  cancelledTabChange: any;
  rescheduledTabChange: any;
  sosTabChange: any;
  otherTabChange: any;
  addressTabChange: any;
  // TotalPendingData - Shivakumar A
  TotalPendingData: any;
  // noShowTabChange - Shivakumar A
  noShowTabChange: any;
  constructor(private request_list_service: RequestListService) {
    // Call super for derived class Pagination - Shivakumar A
    super();
   }

  ngOnInit() {
      // Get data from service - Shivakumar A
      this.request_list_service.TotalPendingData.subscribe(data => this.TotalPendingData = data)
  }

  
  tabRefresh(event) {
    this.cancelledTabChange = false
    this.rescheduledTabChange = false;
    this.sosTabChange = false;
    this.otherTabChange = false;
    this.addressTabChange = false;
    // Initialize noshow to false - Shivakumar A
    this.noShowTabChange = false;
    // Assign Page Options to CancelledData - Shivakumar A
    let CancelledData = { ...this.validPageOptions };

    if (event.index == 0) {
      this.cancelledTabChange = true;
      // to get all pendingcounts after data changes - Shivakumar A
      this.request_list_service.TotalPendingData.subscribe(data => this.TotalPendingData = data)
    }
    else if (event.index == 1) {
      this.rescheduledTabChange = true;
      // to get all pendingcounts after data changes - Shivakumar A
      this.request_list_service.getCancelledRequests(CancelledData).subscribe(response => {
        this.request_list_service.changeMessageData(response.data);
      })
    }
    else if (event.index == 2) {

      this.sosTabChange = true;
      // to get all pendingcounts after data changes - Shivakumar A
      this.request_list_service.getCancelledRequests(CancelledData).subscribe(response => {
        this.request_list_service.changeMessageData(response.data);
      })

    }
    else if (event.index == 3) {
      this.addressTabChange = true;
      // to get all pendingcounts after data changes - Shivakumar A
      this.request_list_service.getCancelledRequests(CancelledData).subscribe(response => {
        this.request_list_service.changeMessageData(response.data);
      })
    }
    else if (event.index == 4) {
      this.otherTabChange = true;
      // to get all pendingcounts after data changes - Shivakumar A
      this.request_list_service.getCancelledRequests(CancelledData).subscribe(response => {
        this.request_list_service.changeMessageData(response.data);
      })
    }
    else if (event.index == 5) {
      this.noShowTabChange = true;
      // to get all pendingcounts after data changes - Shivakumar A
      this.request_list_service.getCancelledRequests(CancelledData).subscribe(response => {
        this.request_list_service.changeMessageData(response.data);
      })
    }
  }

}
