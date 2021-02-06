import { Component, OnInit, Input } from '@angular/core';
import { } from 'googlemaps';
import * as SlidingMarker from "marker-animate-unobtrusive";
import { Router } from '@angular/router';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.sass']
})
export class MarkerComponent implements OnInit {

  marker: google.maps.Marker;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() map: any;
  @Input() id: string;
  @Input() index: number;
  @Input() title: string;
  @Input() icon: string;
  @Input() info: any
  infowindow: google.maps.InfoWindow;

  constructor(private _router: Router) {
    this.marker = new SlidingMarker();
  }

  ngOnInit() {
    var self = this;
    this.marker = new SlidingMarker({ // For initailize the marker 
      position: { lat: this.latitude, lng: this.longitude },
      map: this.map,
      title: this.title,
      duration: 2000,
      easing: "easeOutExpo",
      icon: this.icon,
    });

    this.marker.addListener("mouseover", () => { // Get event if we mouseover marker 
      if (this.info) {
        this.setInfoWindow(this.info); // For open the info window
      }
    });

    this.marker.addListener('mouseout', function () { // For close the infowindow on mouseout
      self.infowindow.close();
    });

    // this.marker.addListener('click', function () { // On clicking on marker goto the cab list page
    //   self._router.navigate(['/admin/rtls/cab-view', self.id])
    // });

  }

  setInfoWindow(info) { // Set the info window
    this.infowindow = new google.maps.InfoWindow({
      content: info
    });
    this.infowindow.open(this.map, this.marker);
  }

  ngOnDestroy() {
    this.marker.setMap(null);
  }

  reset() {
    this.marker.setMap(null);
  }

  changeLocation(latitude: number, longitude: number) { // For changing the marker loction
    this.marker.setPosition({
      lat: latitude,
      lng: longitude
    });
  }

  updateStatus(icon: string, lat, long) { // For update the marker location and icon
    this.marker.setIcon(icon);
    this.changeLocation(lat, long);
  }

  updateIcon(icon: string) { // For update the marker location and icon
    this.marker.setIcon(icon);
  }
}
