import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListComponent } from './component/list.component';
import { CabDetailModule } from '../detail/detail.module';
import { GoogleMapModule } from 'src/app/modules/google-map/google-map.module'
import { SearchFilterModule } from '../../../layout-shared/search-filter/search-filter.module';
import { MatSelectModule, MatMenuModule } from '@angular/material';
import { FindDriverNameModule } from '../../../../../pipes/find-driver-name/find-driver-name.module'
import { DropdownFilterModule } from '../../../layout-shared/dropdown-filter/dropdown-filter.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListService } from './service/list.service';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';

@NgModule({
    declarations: [ListComponent],
    imports: [
        CommonModule,
        CabDetailModule,
        SearchFilterModule,
        MatSelectModule,
        GoogleMapModule,
        FindDriverNameModule,
        DropdownFilterModule,
        ReactiveFormsModule,
        MatMenuModule,
        ShiftTimeModule,
        CustomDatePipeModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListComponent
            }
        ])
    ],
    providers: [ListService]
})
export class CabListModule { }
