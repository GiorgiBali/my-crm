import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

const MaterialComponents = [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule, MatButtonModule];

@NgModule({
  imports: [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule, MatButtonModule],
  exports: [MatDatepickerModule, MatNativeDateModule, MatCardModule, MatTableModule, MatButtonModule]
})
export class MaterialModule { }