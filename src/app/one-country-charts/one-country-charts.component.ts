import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CovidcService } from '../covidc.service';

@Component({
    selector: 'app-one-country-charts',
    templateUrl: './one-country-charts.component.html',
    styleUrls: ['./one-country-charts.component.css']
})
export class OneCountryChartsComponent implements OnInit {

    country_id: string;

    data_table: any;
    country_name: string;
    histo_data: any;
    line_data: any;
    data_loaded: boolean = false;
    constructor(private route: ActivatedRoute, private cs: CovidcService) { }

    ngOnInit(): void {
        this.route.fragment.subscribe(fragment => {
            this.country_id = fragment;
            this.cs.getDataOneCountr(this.country_id).then(data => {

                this.data_table = data['Table'];
                this.country_name = data['Name'];
                this.histo_data = { data_a: data['SevenNews'], labels: data['SevenLabel'] };
                this.line_data = { data_a: data['DayOne'], labels: data['DayOneLabel'] };
                this.data_loaded = true;
            });


        });
    }


}
