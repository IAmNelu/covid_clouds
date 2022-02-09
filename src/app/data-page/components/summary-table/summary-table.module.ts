import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryTableComponent } from './summary-table.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [SummaryTableComponent],
  imports: [
    CommonModule,
    ChartsModule,
  ], exports: [SummaryTableComponent]
})
export class SummaryTableModule { }
