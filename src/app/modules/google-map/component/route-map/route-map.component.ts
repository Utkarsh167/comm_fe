import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { } from 'googlemaps';
// imported SHIFT_TYPE - Shivakumar A
import { SHIFT_TYPE } from '../../../../constant/app-constant';
@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit, AfterViewInit {

  // encodedPolyLine: string;
  // @Input() set mapData(data: any) {
  //   if (data) {
  //     this.encodedPolyLine = data;
  //   }
  // }

  // @Input() set center(value: any) {
  //   if (value) {
  //     this.getEmpCoordinate(this.encodedPolyLine, value);
  //   }
  // }

  // @ViewChild('googleMap', { static: false }) el: ElementRef;
  // map: google.maps.Map;
  // employeesCoordinates: any[] = [];

  // constructor() { }

  // ngOnInit() {
  // }

  // ngAfterViewInit() {
  // }

  // getEmpCoordinate(points, center) {
  //   // this.employeesCoordinates = [];
  //   // data.map(x => {
  //   //   this.employeesCoordinates.push({ lat: x.empLocation.lat, lng: x.empLocation.long })
  //   // })
  //   //this.employeesCoordinates.push(this.employeesCoordinates[0]);

  //   this.initMap(points, center);
  // }


  // /* For initailize the google map */
  // initMap(points, center) {
  //   var centerLocation = new google.maps.LatLng(center.lat, center.long);
  //   var mapOptions = {
  //     zoom: 14,
  //     center: centerLocation
  //   }
  //   this.map = new google.maps.Map(this.el.nativeElement, mapOptions);
  //   var poly = new google.maps.Polyline({
  //     map: this.map,
  //     path: google.maps.geometry.encoding.decodePath(points),
  //     strokeColor: '#000000',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 4,
  //     // fillColor: '#000000',
  //     // fillOpacity: 0.35,
  //     draggable: false,
  //     editable: false,
  //     geodesic: false
  //   });
  //   poly.setMap(this.map);
  // }
  // /* End */





  @Input() set mapData(data: any) {
    if (data && data.length) {
      this.getEmpCoordinate(data);
    }
  }

  @ViewChild('googleMap', { static: false }) el: ElementRef;
  map: google.maps.Map;
  employeesCoordinates: any[] = [];
  // Boundary added Utkrash
  bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  getEmpCoordinate(data) {
    this.employeesCoordinates = [];
    console.log(data);
    data.map(x => {
      // update Map pin --satyam
      this.employeesCoordinates.push({ lat: x.empLocation.lat, lng: x.empLocation.long, name: x.name, shiftType: data.shiftType })

      // Boundary added Utkrash
      this.bounds.extend(new google.maps.LatLng(x.empLocation.lat, x.empLocation.long));
    })
    // this.initMap(this.employeesCoordinates[0]);
    // Added office address - Shivakumar A
    // commented -- satyam
    // if (data[0].shifttype === SHIFT_TYPE[0].value) { 
    //   this.employeesCoordinates.reverse();
    // }
      this.initMap(this.employeesCoordinates[0], data[0].office);
  }


  /* For initailize the google map */
  // initMap(points) {
  //   var centerLocation = new google.maps.LatLng(points.lat, points.lng);
  //   var mapOptions = {
  //     zoom: 17,
  //     center: centerLocation
  //   }
  //    // update Map pin --satyam
  //   this.map = new google.maps.Map(this.el.nativeElement, mapOptions);
  //   const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
  //   var infowindow = new google.maps.InfoWindow();

  //   // update Map pin --satyam
  //   // var poly = new google.maps.Polygon({
  //   //   map: this.map,
  //   //   paths: this.employeesCoordinates,
  //   //   strokeColor: '#091e42',
  //   //   strokeOpacity: 0.8,
  //   //   strokeWeight: 2,
  //   //   fillColor: '#091e42',
  //   //   fillOpacity: 0.35,
  //   //   draggable: false,
  //   //   editable: false,
  //   //   geodesic: false
  //   // });
  //   // poly.setMap(this.map);
  //   let i =1;
  //   this.employeesCoordinates.map(x=> {
  //     let myCenter = new google.maps.LatLng(x.lat, x.lng);
  //     let marker;
  //     let contentString = x.name;

  //      // update Map pin --satyam
  //     marker = new google.maps.Marker({ position: myCenter,
  //       icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green'+i+'.png',
  //       title: x.name
  //      });
  //      marker.setMap(this.map);
  //      i++;
  //   })

  // }
  /* End */

  /* Call this function to creat points and lines on Map - Shivakumar A */
  initMap(points, office) {
    var centerLocation = new google.maps.LatLng(points.lat, points.lng);
    var mapOptions = {
      zoom: 17,
      center: centerLocation
    }
    this.map = new google.maps.Map(this.el.nativeElement, mapOptions);
    let marker;
    let coords = [];
    let geocoder = new google.maps.Geocoder();
    let address = office;
    // console.log(address);
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        // Boundary added Utkrash
        this.bounds.extend(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
        let features = [
          {
            position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
            type: 'office',
            name: 'office',
            num: 0
          }
        ];

        this.employeesCoordinates.map((x, index) => {
          console.log(x);
          let myCenter = new google.maps.LatLng(x.lat, x.lng);
          let contentString = x.name;
          let userData;
          if (this.employeesCoordinates[0].shiftType === SHIFT_TYPE[0].value) {
            userData = {
              position: myCenter,
              type: 'user',
              name: x.name,
              num: this.employeesCoordinates.length - index
            };
          } else {
            userData = {
              position: myCenter,
              type: 'user',
              name: x.name,
              num: index + 1
            };
          }
          features.push(userData);
        })
        for (let i = 0; i < features.length; i++) {
          var icons = {
            user: {
              icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green' + features[i].num + '.png'
            },
            office: {
              icon: 'assets/images/office.png'
            },
          }

          marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            animation: google.maps.Animation.DROP,
            // label: {
            //   text: features[i].name,
            //   color: 'black',
            //   fontSize: '16px',
            //   fontFamily: 'Heebo',
            //   fontWeight: 'bold'

            // },
            map: this.map,
          });
          coords.push(features[i].position);
        }
        var line = new google.maps.Polyline({
          path: coords,
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        line.setMap(this.map);
        // Boundary added Utkrash
        this.map.fitBounds(this.bounds);

      } else {
        // console.log(google.maps.GeocoderStatus.ERROR);
      }
    });
  }
}

