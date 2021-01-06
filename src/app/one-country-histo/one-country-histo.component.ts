import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
    selector: 'app-one-country-histo',
    templateUrl: './one-country-histo.component.html',
    styleUrls: ['./one-country-histo.component.css']
})
export class OneCountryHistoComponent implements OnInit {
    @Input() summary_data: any;
    @Input() country: string;
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                display: false
            }
        }
    };
    public barChartLabels: Label[] = ['--', '--', '--', '--', '--', '--', '--'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
        { data: [0, 0, 0, 0, 0, 0, 0], label: 'Daily Deaths', backgroundColor: 'rgba(230, 152, 170,1)' }, //  deaths
        { data: [0, 0, 0, 0, 0, 0, 0], label: 'Daily Recovered', backgroundColor: 'rgba(144, 199, 245,1)' }, // recovered
        { data: [0, 0, 0, 0, 0, 0, 0], label: 'Daily New Cases', backgroundColor: 'rgba(250, 225, 152,1)' } // new cases
    ];
    constructor() { }

    ngOnInit(): void {
        let nds = [];
        let nrs = [];
        let ncs = [];
        for (let _i = 0; _i < this.summary_data.data_a.length; _i++) {
            const el = this.summary_data.data_a[_i];
            nds.push(el.ND);
            nrs.push(el.NR);
            ncs.push(el.NC);
        }
        this.barChartData[0].data = nds;
        this.barChartData[1].data = nrs;
        this.barChartData[2].data = ncs;
        this.barChartLabels = this.summary_data.labels;
    }
    ngOnChanges() {
        this.ngOnInit();
    }
}
