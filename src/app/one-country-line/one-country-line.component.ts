import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
    selector: 'app-one-country-line',
    templateUrl: './one-country-line.component.html',
    styleUrls: ['./one-country-line.component.css']
})
export class OneCountryLineComponent implements OnInit {
    @Input() summary_data: any;
    @Input() country: string;
    // LINE CHART
    lineChartData: ChartDataSets[] = [
        { data: [0, 1], label: 'Total Deaths' },
        { data: [0, 2], label: 'Total Recovered' },
        { data: [0, 3], label: 'Total Cases' },
    ];
    lineChartLabels: Label[] = ['Then', 'Now'];

    lineChartOptions = {
        responsive: true,
        plugins: {
            datalabels: {
                display: false
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0

                }
            }]
        }
    };

    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';
    constructor() { }

    ngOnInit(): void {
        // LINE
        this.lineChartLabels = this.summary_data.labels;
        this.lineChartData[0].data = this.summary_data.data_a.TDs;
        this.lineChartData[1].data = this.summary_data.data_a.TRs;
        this.lineChartData[2].data = this.summary_data.data_a.TCs;
    }

    ngOnChanges() {
        this.ngOnInit();
    }

}
