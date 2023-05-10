import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

const MaterialComponents = [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule];

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule],
  exports: [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule]
})
export class MaterialModule { }