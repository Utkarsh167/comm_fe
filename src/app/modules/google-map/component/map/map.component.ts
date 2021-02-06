import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { } from 'googlemaps';
import { MarkerComponent } from '../marker/marker.component';
import { SocketService } from 'src/app/modules/shared/services/socket/socket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @Input() set mapData(data: any) {
    if (data.length > 0) {
      this.allCabLocationdata = data;
      this.makeMarkerLoop();
    }
    this._socket.getUpdatedCabLocation().subscribe(resp => { // data coming when driver location change
      if (resp) {
        this.updateStatus(resp, this.markers[resp.cabId]);
      }
    })
  }

  @ViewChild('googleMap', { static: false }) el: ElementRef;
  @ViewChildren(MarkerComponent) private markerComponents: QueryList<MarkerComponent>;
  map: google.maps.Map;
  markers: any = {};
  allCabLocationdata: any[] = [];
  cabLat: number;
  cabLng: number;

  constructor(private _socket: SocketService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
  }

  /* For initailize the google map */
  initMap() {
    var centerLocation = new google.maps.LatLng(28.5355, 77.3910);
    var mapOptions = {
      zoom: 11,
      center: centerLocation
    }
    this.map = new google.maps.Map(this.el.nativeElement, mapOptions);
  }
  /* End */


  /* Make getter for marker */
  get keys(): string[] {
    return this.markers ? Object.keys(this.markers) : [];
  }
  /* End */


  /* For making Marker on map */

  makeMarkerLoop() {
    var self = this;
    let cabImage;
    if (self.allCabLocationdata) {
      self.allCabLocationdata.map(cab => {
        cab.cabId.driverMapped.map(x => {
          if (x.onlineStatus) { // Check driver status id active then set the marker lat lng
            self.cabLat = x.latitude;
            self.cabLng = x.longitude;
            cabImage = this.createMarkerImage('assets/images/ic_car_active.svg');
            let info = `<p>Cab No : ${cab.cabId.cabBadge} </p>
          <p>Driver Name : ${cab.cabId.driverMapped[0].name}<p>`; // For making info window 
            this.createMarkerArray(self.cabLat, self.cabLng, cab.cabId._id, self.map, info, cabImage);
          }
        })

      })
    }
  }

  createMarkerImage(url) {
    return { url: url, scaledSize: new google.maps.Size(40, 40) }
  }

  createMarkerArray(lat, long, id, map, info, icon) { // set data in marker 

    if (this.markers[id]) {
      this.markers[id].latitude = lat;
      this.markers[id].longitude = long;
      this.markers[id].info = info ? String(info) : null;
      this.markers[id].icon = icon;
      this.markers[id].map = map;
    }

    else {
      this.markers[id] = {};
      this.markers[id].latitude = lat;
      this.markers[id].longitude = long;
      this.markers[id].id = id;
      this.markers[id].info = info ? String(info) : null;
      this.markers[id].icon = icon;
      this.markers[id].map = map;
    }
  }

  /* End */

  /* Update the cab location */

  updateStatus(data, marker) {
    const temp: MarkerComponent = this.markerComponents.find(item => {
      return item.id === data.cabId;
    });
    if (temp) {
      if (!data.completeRideFlag) {
        temp.updateStatus(marker.icon, data.latitude, data.longitude);
      }
      else if (data.completeRideFlag) {
        delete this.markers[data.cabId];
      }
    }
  }

  /* END */
}
