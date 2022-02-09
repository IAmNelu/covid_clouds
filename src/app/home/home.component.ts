import { Component, OnInit } from '@angular/core';
import { CovidcService } from '../services/covidc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public covidcService: CovidcService) { }

  ngOnInit(): void {

  }

}
