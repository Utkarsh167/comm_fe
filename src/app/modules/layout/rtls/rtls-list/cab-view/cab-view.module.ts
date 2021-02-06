import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CabViewComponent } from './component/cab-view.component';
import { CabDetailModule } from '../detail/detail.module';
import { GoogleMapModule } from 'src/app/modules/google-map/google-map.module'
import { FindDriverNameModule } from '../../../../../pipes/find-driver-name/find-driver-name.module'
import { MatTooltipModule } from '@angular/material';



@NgModule({
    declarations: [CabViewComponent],
    imports: [
        CommonModule,
        CabDetailModule,
        GoogleMapModule,
      FindDriverNameModule,
      MatTooltipModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: CabViewComponent
            }
        ])
    ],
})
export class CabViewModule { }
