import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './component/autocomplete.component';
import { MatInputModule, MatAutocompleteModule, MatOptionModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports:[
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
