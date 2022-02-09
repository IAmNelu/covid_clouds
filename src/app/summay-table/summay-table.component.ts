import { Component, OnInit } from '@angular/core';
import { CovidcService } from '../services/covidc.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-summay-table',
  templateUrl: './summay-table.component.html',
  styleUrls: ['./summay-table.component.css']
})
export class SummayTableComponent implements OnInit {
  total_cases: any;
  new_cases: any;
  active_cases: any;

  total_recovered: any;
  new_recovered: any;
  recovery_rate: any;

  total_deaths: any;
  new_deths: any;
  mortality_rate: any;

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
  constructor(private covidService: CovidcService) { }

  ngOnInit(): void {
    this.covidService.getDataSummary().then(global_data => {
      this.total_cases = global_data["TotalConfirmed"];
      this.new_cases = global_data["NewConfirmed"];

      this.total_recovered = global_data["TotalRecovered"];
      this.new_recovered = global_data["NewRecovered"];

      this.total_deaths = global_data["TotalDeaths"]
      this.new_deths = global_data["NewDeaths"]

      this.active_cases = this.total_cases - this.total_recovered;

      this.recovery_rate = (this.total_recovered / this.total_cases * 100).toFixed(2);
      this.mortality_rate = (this.total_deaths / this.total_cases * 100).toFixed(2);

      this.total_cases = this.numberWithCommas(this.total_cases);
      this.new_cases = this.numberWithCommas(this.new_cases);
      this.active_cases = this.numberWithCommas(this.active_cases);

      this.total_recovered = this.numberWithCommas(this.total_recovered);
      this.new_recovered = this.numberWithCommas(this.new_recovered);

      this.total_deaths = this.numberWithCommas(this.total_deaths);
      this.new_deths = this.numberWithCommas(this.new_deths);

      this.dead = global_data["TotalDeaths"]
      this.recovered = global_data["TotalRecovered"];
      this.active = global_data["TotalConfirmed"] - this.recovered;

      this.pieChartData = [this.dead, this.recovered, this.active];
    });
  }
  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
