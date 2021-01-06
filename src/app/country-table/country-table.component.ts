import { Component, OnInit } from '@angular/core';
import { CovidcService } from '../covidc.service';
import { faChevronCircleUp, faChevronCircleDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-country-table',
    templateUrl: './country-table.component.html',
    styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent implements OnInit {
    up_selected = faChevronCircleUp;
    down_selected = faChevronCircleDown;
    up_unselected = faChevronUp;
    down_unselected = faChevronDown;
    data_defined = false;

    data_array = [];

    headers = [
        {
            _i: 0,
            nm: 'Country',
            cls: 'align-middle name-cel',
            up: this.up_unselected,
            dws: this.down_selected,
            cmp: this.compC
        },
        {
            _i: 1,
            nm: 'New Cases',
            cls: 'align-middle cas-cel',
            up: this.up_unselected,
            dws: this.down_unselected,
            cmp: this.compNC
        },
        {
            _i: 2,
            nm: 'Total Cases',
            cls: 'align-middle cas-cel',
            up: this.up_unselected,
            dws: this.down_unselected,
            cmp: this.compTC
        },
        {
            _i: 3,
            nm: 'New Recoveries',
            cls: 'align-middle rec-cel',
            up: this.up_unselected,
            dws: this.down_unselected,
            cmp: this.compNR
        },
        {
            _i: 4,
            nm: 'Total Recoveries',
            cls: 'align-middle rec-cel',
            up: this.up_unselected,
            dws: this.down_unselected,
            cmp: this.compTR
        },
        {
            _i: 5,
            nm: 'New Deaths',
            cls: 'align-middle det-cel',
            up: this.up_unselected,
            dws: this.down_unselected,
            cmp: this.compND
        },
        {
            _i: 6,
            nm: 'Total Deaths',
            cls: 'align-middle det-cel',
            up: this.up_unselected,
            dws: this.down_unselected,
            cmp: this.compTD
        }
    ];
    constructor(private cs: CovidcService, private router: Router) { }

    ngOnInit(): void {
        this.cs.getCountries().then(all_data => {
            this.data_array = all_data;
            this.data_defined = true;
        });
    }

    click_event(comparator, reversed, i) {
        this.data_array.sort(comparator);
        this.deactivate_all();
        if (reversed == 1) {
            this.data_array.reverse();
            this.headers[i].up = this.up_selected;
        } else {
            this.headers[i].dws = this.down_selected;
        }


    }

    deactivate_all() {
        for (let i = 0; i < this.headers.length; i++) {
            this.headers[i].up = this.up_unselected;
            this.headers[i].dws = this.down_unselected;

        }
    }

    compC(a, b): number {
        return a.Country.localeCompare(b.Country);
    }


    compNC(a, b): number {
        return a.NewConfirmed - b.NewConfirmed;
    }
    compTC(a, b): number {
        return a.TotalConfirmed - b.TotalConfirmed;
    }
    compNR(a, b): number {
        return a.NewRecovered - b.NewRecovered;
    }
    compTR(a, b): number {
        return a.TotalRecovered - b.TotalConfirmed;
    }
    compND(a, b): number {
        return a.NewDeaths - b.NewDeaths;
    }
    compTD(a, b): number {
        return a.TotalDeaths - b.TotalDeaths;
    }
    goToCountry(country_id) {
        // Navigate to /results?page=1
        this.router.navigate(['country'], { fragment: country_id });
    }


}
