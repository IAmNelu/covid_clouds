import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-one-country-table',
    templateUrl: './one-country-table.component.html',
    styleUrls: ['./one-country-table.component.css']
})
export class OneCountryTableComponent implements OnInit {
    @Input() summary_data: any;
    @Input() country: string;
    total_cases: any;
    new_cases: any;
    active_cases: any;

    total_recovered: any;
    new_recovered: any;
    recovery_rate: any;

    total_deaths: any;
    new_deths: any;
    mortality_rate: any;
    constructor() { }

    ngOnInit(): void {
        this.total_cases = this.summary_data.TC;
        this.new_cases = this.summary_data.NC;

        this.total_recovered = this.summary_data.TR;
        this.new_recovered = this.summary_data.NR;

        this.total_deaths = this.summary_data.TD;
        this.new_deths = this.summary_data.ND;


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
    }

    ngOnChanges() {
        this.ngOnInit();
    }

    numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
