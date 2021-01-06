import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
    selector: 'app-one-country-pie-chart',
    templateUrl: './one-country-pie-chart.component.html',
    styleUrls: ['./one-country-pie-chart.component.css']
})
export class OneCountryPieChartComponent implements OnInit {
    @Input() summary_data: any;
    @Input() country: string;
    dead: number = 1;
    recovered: number = 1;
    active: number = 1;
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top'
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return "";//label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = ['Dead Cases', 'Recovered Cases', 'Active Cases'];
    public pieChartData: number[] = [0, 0, 0];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
        {
            backgroundColor: ['rgba(230, 152, 170,1)', 'rgba(144, 199, 245,1)', 'rgba(250, 225, 152,1)',],
        },
    ];
    constructor() { }

    ngOnInit(): void {
        this.dead = this.summary_data.TD;
        this.recovered = this.summary_data.TR;
        this.active = this.summary_data.TC - this.recovered;

        this.pieChartData = [this.dead, this.recovered, this.active];
    }

    ngOnChanges() {
        this.ngOnInit();
    }


}
