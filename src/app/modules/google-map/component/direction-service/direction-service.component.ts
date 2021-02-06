import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-direction-service',
  templateUrl: './direction-service.component.html',
  styleUrls: ['./direction-service.component.sass']
})
export class DirectionServiceComponent implements OnInit, AfterViewInit {

  // @Input() startPoint;
  // @Input() endPoint;
  // map: google.maps.Map;
  // directionsService: google.maps.DirectionsService;
  // directionsDisplay: google.maps.DirectionsRenderer;
  // wayPoints = [];

  map: google.maps.Map;
  poly: google.maps.Polyline;
  @ViewChild('googleMap', { static: false }) el: ElementRef;

  @Input() mapTracking;

  @Input() set empData(data: any) {
    if (data) {
      this.initMap(data.route.route);
    }
  }
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  /* For initailize the google map */
  initMap(points) {
    if (this.poly) {
      this.poly.setMap(null);
    }

    this.map = this.mapTracking;
    this.poly = new google.maps.Polyline({
      map: this.map,
      path: google.maps.geometry.encoding.decodePath(points.points),
      strokeColor: '#091e42',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      draggable: false,
      editable: false,
      geodesic: false
    });
    this.poly.setMap(this.map);
  }
  /* End */



  // /* For getting the google direction services */
  // initRenderer() {
  //   if (!this.directionsDisplay) {
  //     this.directionsService = new google.maps.DirectionsService();
  //     this.directionsDisplay = new google.maps.DirectionsRenderer();
  //     this.directionsDisplay.setOptions({
  //       suppressMarkers: true,
  //       polylineOptions: {
  //         strokeColor: 'black'
  //       }
  //     });
  //   }
  // }
  // /* END */

  // /* For drawing the route and direction */

  // initDirection(map: google.maps.Map, empData) {
  //   if (this.startPoint && this.startPoint.pickUpLocation && this.startPoint.pickUpLocation.length === 2) {
  //     this.map = map;
  //     this.initRenderer();
  //     this.directionsDisplay.setMap(map);
  //     if (empData) {
  //       this.getWayPoints(empData)
  //     }
  //     this.redrawPath();
  //   }
  // }

  // redrawPath() {
  //   const startPoint = new google.maps.LatLng(this.startPoint.pickUpLocation[1], this.startPoint.pickUpLocation[0]); // company lat lng
  //   const endPoint = new google.maps.LatLng(this.endPoint.dropLocation[1], this.endPoint.dropLocation[0]); // company lat lng
  //   this.directionsService.route({
  //     origin: startPoint,
  //     destination: endPoint,
  //     waypoints: this.wayPoints,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //     optimizeWaypoints: true,
  //   }, (response, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.directionsDisplay.setDirections(response);
  //     }
  //   });
  // }

  // getWayPoints(data) { // For making way points array
  //   data.map(x => {
  //     this.wayPoints.push({
  //       location: new google.maps.LatLng(x.empId.pickup.coordinates[1], x.empId.pickup.coordinates[0]),
  //       stopover: true
  //     })
  //   })
  // }

  /* END */
}
