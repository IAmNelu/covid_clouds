import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { CovidcService } from '../services/covidc.service';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
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



  constructor(private cs: CovidcService) { }

  ngOnInit(): void {
    this.cs.getDataFromHistory().then(all_data => {
      this.barChartData[0].data = all_data.NewDeaths7;
      this.barChartData[1].data = all_data.NewRecovered7;
      this.barChartData[2].data = all_data.NewConfirmed7;
      this.barChartLabels = all_data.lables_7;

      // LINE
      this.lineChartLabels = all_data.lables_april;
      this.lineChartData[0].data = all_data.TotalDeathsA;
      this.lineChartData[1].data = all_data.TotalRecoveredA;
      this.lineChartData[2].data = all_data.TotalConfirmedA;

    });
  }
}