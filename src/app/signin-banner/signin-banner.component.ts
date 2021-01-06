import { Component, OnInit } from '@angular/core';
import { CovidcService } from '../covidc.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
    selector: 'app-signin-banner',
    templateUrl: './signin-banner.component.html',
    styleUrls: ['./signin-banner.component.css']
})
export class SigninBannerComponent implements OnInit {

    private response: any;
    constructor(public covidcService: CovidcService) { }

    ngOnInit(): void {
    }
}
