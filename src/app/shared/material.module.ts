import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

const MaterialComponents = [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule, MatButtonModule];

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule, MatButtonModule],
  exports: [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule, MatButtonModule]
})
export class MaterialModule { }