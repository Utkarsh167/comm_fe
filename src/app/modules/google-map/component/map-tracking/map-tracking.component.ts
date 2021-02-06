import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  ViewChildren,
  QueryList
} from "@angular/core";
import {} from "googlemaps";
import { MarkerComponent } from "../marker/marker.component";
import { SocketService } from "src/app/modules/shared/services/socket/socket.service";
import { DirectionServiceComponent } from "../direction-service/direction-service.component";
import { EmployeePickUpStatus } from "../../../../constant/enum";
import { DataTransferService } from "src/app/modules/shared/services/data-transfer.service";

@Component({
  selector: "app-map-tracking",
  templateUrl: "./map-tracking.component.html",
  styleUrls: ["./map-tracking.component.scss"]
})
export class MapTrackingComponent implements OnInit {
  polyLineData: any;
  @Input() set mapData(data: any) {
    if (
      data &&
      data.route &&
      data.route.employees &&
      data.route.employees.length > 0
    ) {
      setTimeout(()=>{    //<<<---    using ()=> syntax
        this.polyLineData = null;
      this.polyLineData = data;
      this.allEmpLocationData = data.route.employees; // getting all employee array
      this.officeAddress = data.officeLocation;
      this.makeCompanyMarker(data.officeLocation.lat, data.officeLocation.long); // Foe making the company marker
      this.makeDriverMarker(
        data.officeLocation.lat,
        data.officeLocation.long,
        data.cab.driverMapped[0]._id,
        data.cab.driverMapped[0]
      );
      this.makeMarkerLoop(); // For making the all employee marker
   }, 500);
      
    }
  }

  @Input() set driverLiveLocation(data: any) {
    if (data) {
      if (data.pickupStatus) {
        this.updateStatus(data, this.markers[data.empId]);
      } else {
        this.updateStatus(data, this.markers[data.userId]);
      }
    }
  }

  @ViewChild("googleTrackingMap", { static: false }) el: ElementRef;
  @ViewChildren(MarkerComponent) private markerComponents: QueryList<
    MarkerComponent
  >;
  @ViewChild(DirectionServiceComponent, { static: true })
  private directionComponent: DirectionServiceComponent;
  map: google.maps.Map;
  markers: any = {};
  allEmpLocationData: any[] = [];
  officeAddress: any;
  cabLat: number;
  cabLng: number;

  constructor(
    private _socket: SocketService,
    private _dataTransferService: DataTransferService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._dataTransferService.getProfileDetailForLive().subscribe(response => {
      this.officeAddress = response;
      this.initMap();
    });
  }

  /* For initailize the google map */
  initMap() {
    var centerLocation = new google.maps.LatLng(
      this.officeAddress[1],
      this.officeAddress[0]
    );
    var mapOptions = {
      zoom: 13,
      center: centerLocation
    };
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
    var empIcon;
    var icon;
    if (self.allEmpLocationData) {
      self.map.setCenter(
        new google.maps.LatLng(this.officeAddress.lat, this.officeAddress.long)
      );
      self.allEmpLocationData.map((emp, index) => {
        if (emp) {
          self.cabLat = emp.empLocation.lat;
          self.cabLng = emp.empLocation.long;
          let info = `<p>Emp Name : ${emp.name} </p>`; // For making info window

          if (
            EmployeePickUpStatus.ONBOARDED === emp.pickupStatus ||
            EmployeePickUpStatus.STARTRIDE === emp.pickupStatus
          ) {
            empIcon = this.createMarkerImage(
              "assets/images/green_delivery_marker.svg"
            );
            this.createMarkerArray(
              self.cabLat,
              self.cabLng,
              emp.empId,
              self.map,
              info,
              empIcon
            );
          } else if (EmployeePickUpStatus.NOSHOW === emp.pickupStatus) {
            empIcon = this.createMarkerImage(
              "assets/images/ic_drop_marker_inactive.svg"
            );
            this.createMarkerArray(
              self.cabLat,
              self.cabLng,
              emp.empId,
              self.map,
              info,
              empIcon
            );
          } else if (EmployeePickUpStatus.NOACTION === emp.pickupStatus) {
            empIcon = this.createMarkerImage(
              "assets/images/green_delivery_marker.svg"
            );
            this.createMarkerArray(
              self.cabLat,
              self.cabLng,
              emp.empId,
              self.map,
              info,
              empIcon
            );
          } else if (EmployeePickUpStatus.OFFBOARD === emp.pickupStatus) {
            empIcon = this.createMarkerImage(
              "assets/images/ic_drop_marker_inactive.svg"
            );
            this.createMarkerArray(
              self.cabLat,
              self.cabLng,
              emp.empId,
              self.map,
              info,
              empIcon
            );
          }
        }
      });
    }
  }

  /* For making the company marker */
  makeCompanyMarker(companyLat, companyLong) {
    let companyImage;
    let info = `<p>Company Name : ${localStorage.getItem('fleet-admin-name')} </p>`; // For making info window
    companyImage = this.createMarkerImage("assets/images/premium_vendor.svg");
    this.createMarkerArray(
      companyLat,
      companyLong,
      "dsfdsfdgfdsf47y5jdbf",
      this.map,
      info,
      companyImage
    );
  }
  /* END */

  /* For making the company marker */
  makeDriverMarker(driverLat, driverLng, driverId, driverData) {
    let cabImage;
    let info = `<p>Driver Name : ${driverData.name} </p>
    <p>Driver Mobile No : ${driverData.mobileNo} </p> `; // For making info window
    cabImage = this.createDriverMarker("assets/images/ic_car_active.svg");
    this.createMarkerArray(
      driverLat,
      driverLng,
      driverId,
      this.map,
      info,
      cabImage
    );
  }

  createDriverMarker(url) {
    return {
      url: url,
      scaledSize: new google.maps.Size(40, 40)
    };
  }
  /* END */

  /* For getting the icon in a format */
  createMarkerImage(url) {
    return { url: url, scaledSize: new google.maps.Size(40, 40) };
  }
  /* END */

  createMarkerArray(lat, long, id, map, info, icon?) {
    // set data in marker

    if (this.markers[id]) {
      this.markers[id].latitude = lat;
      this.markers[id].longitude = long;
      this.markers[id].info = info ? String(info) : null;
      this.markers[id].icon = icon;
      this.markers[id].map = map;
    } else {
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
    let temp;
    if (data && data.pickupStatus) {
      temp = this.markerComponents.find(item => {
        return item.id === data.empId;
      });
    } else {
      temp = this.markerComponents.find(item => {
        return item.id === data.userId;
      });
    }
    if (temp) {
      if (!data.completeRideFlag) {
        if (EmployeePickUpStatus.ONBOARDED === data.pickupStatus) {
          // Check for employee is picked
          let onBoardIcon;
          onBoardIcon = this.createMarkerImage(
            "assets/images/green_delivery_marker.svg"
          ); // set picked icon
          marker.icon = onBoardIcon;
          temp.updateIcon(marker.icon);
        } else if (EmployeePickUpStatus.NOSHOW === data.pickupStatus) {
          // Check for no show case
          let noShowIcon;
          noShowIcon = this.createMarkerImage(
            "assets/images/ic_drop_marker_inactive.svg"
          ); // set NoShow icon
          marker.icon = noShowIcon;
          temp.updateIcon(marker.icon);
        } else if (EmployeePickUpStatus.OFFBOARD === data.pickupStatus) {
          // Check for no show case
          let noShowIcon;
          noShowIcon = this.createMarkerImage(
            "assets/images/ic_drop_marker_inactive.svg"
          ); // set NoShow icon
          marker.icon = noShowIcon;
          temp.updateIcon(marker.icon);
        } else {
          temp.updateStatus(marker.icon, data.latitude, data.longitude);
        }
      } else if (data.completeRideFlag) {
        delete this.markers[data.cabId];
      }
    }
  }

  /* END */
}
