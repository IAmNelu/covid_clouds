import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryTableComponent } from './summary-table.component';



@NgModule({
  declarations: [SummaryTableComponent],
  imports: [
    CommonModule
  ], exports: [SummaryTableComponent]
})
export class SummaryTableModule { }
