import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './component/map/map.component';
import { MarkerComponent } from './component/marker/marker.component';
import { MapTrackingComponent } from './component/map-tracking/map-tracking.component';
import { DirectionServiceComponent } from './component/direction-service/direction-service.component';
import { RouteMapComponent } from './component/route-map/route-map.component';

@NgModule({
  declarations: [MapComponent, MarkerComponent, MapTrackingComponent, DirectionServiceComponent, RouteMapComponent],
  imports: [
    CommonModule
  ],
  exports: [MapComponent, MarkerComponent, MapTrackingComponent, DirectionServiceComponent,RouteMapComponent]

})
export class GoogleMapModule { }
