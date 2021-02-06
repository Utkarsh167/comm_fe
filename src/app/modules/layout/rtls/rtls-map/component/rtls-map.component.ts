import { Component, OnInit, OnDestroy } from '@angular/core';
import { RtlsMapService } from '../service/rtls-map.service';
import { Router } from '@angular/router';
import { EMPLOYEES } from '../../../../../constant/absolute-routes';
import { SocketService } from 'src/app/modules/shared/services/socket/socket.service';

@Component({
  selector: 'app-rtls-map',
  templateUrl: './rtls-map.component.html',
  styleUrls: ['./rtls-map.component.scss']
})
export class RtlsMapComponent implements OnInit, OnDestroy {

  mapData: any[] = [];
  childMapData: any[] = [];

  constructor(private _rtlsService: RtlsMapService,
    private _router: Router,
    private _socket: SocketService) { }

  ngOnInit() {
    this.initSocket();
    this.getAllCab();
  }

  ngOnDestroy() {
    this._socket.leaveUserFromPage().subscribe(rep => {

    });
  }

  /********* For get all active cabs *************/

  getAllCab() {
    this._rtlsService.getAllActiveCabs().subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([EMPLOYEES]);
        }
        this.mapData = response.data.cabList;
        this.childMapData = [...this.mapData];

      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    )
    this.getNewCheckInCab(); // For getting the cab data from socket
  }

  /********* END *************/


  /********* For socket connection *************/

  initSocket() {
    this._socket.initialiseSocket();
  }

  getNewCheckInCab() {
    this._socket.getCheckInCab().subscribe(resp => {
      if (resp) {
        this.mapData.push(resp);
        this.childMapData = [...this.mapData];
      }
    })
  }

  /********* END *************/
}
