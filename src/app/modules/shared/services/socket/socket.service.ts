import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import {
  CAB_LOCATION_ON_MAP,
  CAB_LATEST_LOCATION,
  LEAVE_ADMIN_PAGE,
  GET_CHECKIN_CAB,
  CAB_LIVE_LOCATION_EMIT,
  CAB_LIVE_LOCATION_LISTEN
} from "../../../../constant/socket-events";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  socket: any;
  socketUrl: string = environment.socketUrl;
  token: string = localStorage.getItem("fleet-admin-token");

  constructor() {}

  initialiseSocket() {
    // For connecting the socket
    if (!this.socket) {
      this.socket = io(this.socketUrl, {
        query: { authorization: this.token },
        secure: true,
        transports: ["websocket"]
      });
      //  localStorage.debug = '*';
    }
    this.onReconnect();
  }

  onReconnect() {
    this.socket.on("reconnect", (attemptNumber: any) => {});
  }

  getUpdatedCabLocation(): Observable<any> {
    this.socket.emit(CAB_LOCATION_ON_MAP, {});
    return new Observable(observer => {
      this.socket.on(CAB_LATEST_LOCATION, (data: any) => {
        observer.next(data);
      });
    });
  }

  leaveUserFromPage(): Observable<any> {
    return new Observable(observer => {
      this.socket.emit(LEAVE_ADMIN_PAGE, {});
    });
  }

  getCheckInCab(): Observable<any> {
    return new Observable(observer => {
      this.socket.on(GET_CHECKIN_CAB, (data: any) => {
        observer.next(data);
      });
    });
  }

  getLiveCabLocation(rosterId): Observable<any> {
    this.socket.emit(CAB_LIVE_LOCATION_EMIT, { rosterId: rosterId });
    return new Observable(observer => {
      this.socket.on(CAB_LIVE_LOCATION_LISTEN, (data: any) => {
        observer.next(data);
      });
    });
  }
}
