import { Component, OnInit } from '@angular/core';
import { CabViewService } from '../service/cab-view.service';
import { EMPLOYEES } from '../../../../../../constant/absolute-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/modules/shared/services/socket/socket.service';

@Component({
  selector: 'app-cab-view',
  templateUrl: './cab-view.component.html',
  styleUrls: ['./cab-view.component.scss']
})
export class CabViewComponent implements OnInit {

  mapData: any;
  cabId: string;
  driverLiveLocation: any;

  constructor(private _cabViewService: CabViewService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _socket: SocketService) { }

  ngOnInit() {
    this.cabId = this._route.snapshot.params.id;
    this.initSocket();
    this.getAllCabsList();
    this.getCabLiveLocation();
  }

  /* For gitting all cabs */

  getAllCabsList() {
    this._cabViewService.getSingleCabView({ cabId: this.cabId }).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([EMPLOYEES]);
        }
        this.mapData = response.data[0];
      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    )
  }

  initSocket() {
    this._socket.initialiseSocket();
  }

  getCabLiveLocation() {
    this._socket.getLiveCabLocation(this.cabId).subscribe(resp => {
      if (resp) {
        this.driverLiveLocation = null;
        this.driverLiveLocation = resp;
      }
    })
  }

}
