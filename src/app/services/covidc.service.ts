import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { data, merge } from 'jquery';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class CovidcService {
  private all_data: Data = new Data;

  private url_base: string = "https://api.covid19api.com/";

  constructor(
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private router: Router,) { }




  getDataSummary_req(): Observable<HttpResponse<string>> {
    var options: {
      observe: 'response',
      responseType: 'text'
    }
    return this.http.get(this.url_base + "summary", options);
  }

  getDataDaySummary(start: string, end: string): Observable<HttpResponse<any>> {
    var from_to_url = this.url_base + 'world?from=' + start + '&to=' + end;
    var tempurl = "https://api.covid19api.com/world?from=2020-11-01T00:00:00Z&to=2020-11-02T00:00:00Z";
    return this.http.get(from_to_url, { observe: 'response', responseType: 'json' });
  }

  getTodaySummary() {
    let todayFull = new Date();
    let todayDate = ((new Date()).toISOString()).split('T')[0] + 'T00:00:00Z';
    todayFull.setMinutes(0);
    todayFull.setSeconds(0);
    todayFull.setMilliseconds(0);
    let from_url = `${this.url_base}world?from=${todayDate}&to=${todayFull.toISOString()}`;
    return this.http.get(from_url, { observe: 'response', responseType: 'json' });
  }

  getFromAprilSummary() {
    let todayDate = ((new Date()).toISOString()).split('T')[0] + 'T00:00:00Z';
    let from_url = `${this.url_base}world?from=2020-04-13T00:00:00Z&to=${todayDate}`;
    return this.http.get(from_url, { observe: 'response', responseType: 'json' });
  }

  async getDataSummary() {
    if (!this.all_data.defined_general) {
      let sum_req = this.getDataSummary_req();
      await this.all_data.populate_fields_global(sum_req);
    }
    return {
      TotalConfirmed: this.all_data.total_cases,
      NewConfirmed: this.all_data.total_cases_n,
      TotalDeaths: this.all_data.total_deaths,
      NewDeaths: this.all_data.total_deaths_n,
      TotalRecovered: this.all_data.total_recovered,
      NewRecovered: this.all_data.total_recovered_n
    }
  }

  async getDataFromHistory() {
    if (!this.all_data.defined_history) {
      let today_req = this.getTodaySummary();
      let from_april_req = this.getFromAprilSummary();
      await this.all_data.populate_old(today_req, from_april_req);

    }
    return {
      lables_7: this.all_data.get_data_names_7(),
      lables_april: this.all_data.get_data_names_from_april(),
      NewDeaths7: this.all_data.new_ded_7,
      NewConfirmed7: this.all_data.new_cas_7,
      NewRecovered7: this.all_data.new_rec_7,
      TotalConfirmedA: this.all_data.total_from_april_cas,
      TotalDeathsA: this.all_data.total_from_april_ded,
      TotalRecoveredA: this.all_data.total_from_april_rec
    };
  }

  async getCountries() {
    if (!this.all_data.fefined_counties) {
      let sum_req = this.getDataSummary_req();
      await this.all_data.populate_countries(sum_req);
    }
    return this.all_data.country_data;
  }

  getOneCountry(c_id: string) {
    let url = `https://api.covid19api.com/total/country/${c_id}`;
    return this.http.get(url, { observe: 'response', responseType: 'json' })
  }

  async getDataOneCountr(c_id: string) {
    let c_s = await this.get_country_names();
    let ok = false;
    for (let _i = 0; _i < c_s.length; _i++) {
      const element = c_s[_i];
      if (element['Slug'] == c_id) {
        ok = true;
        break;
      }
    }

    if (!ok) {
      this.router.navigate([""]);
      return;
    }

    let fire_data = this.get_object_frmo_collection_by_key('countries', c_id);
    if (jQuery.isEmptyObject(fire_data)) {
      let req = await this.getOneCountry(c_id).toPromise();
      let data_needed = this.arangeCountryData(req);
      let now = new Date();
      now.setHours(1);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      this.fireStore.collection("countries").doc(c_id).set(
        {
          date: now.toISOString(),
          data: data_needed
        },
        { merge: true });
      return data_needed;
    }

    return fire_data;
  }

  arangeCountryData(data_stuff: any) {
    let data_array = data_stuff.body;

    let l = data_array.length;
    let sum_t = {
      TC: data_array[l - 1].Confirmed,
      TR: data_array[l - 1].Recovered,
      TD: data_array[l - 1].Deaths,
      NC: data_array[l - 1].Confirmed - data_array[l - 2].Confirmed,
      NR: data_array[l - 1].Recovered - data_array[l - 2].Recovered,
      ND: data_array[l - 1].Deaths - data_array[l - 2].Deaths,
    };
    let seven_news = [];
    for (let _i = 0; _i < 7; _i++) {
      seven_news.push({
        NC: data_array[l - 1 - _i].Confirmed - data_array[l - 2 - _i].Confirmed,
        NR: data_array[l - 1 - _i].Recovered - data_array[l - 2 - _i].Recovered,
        ND: data_array[l - 1 - _i].Deaths - data_array[l - 2 - _i].Deaths,
      });
    }
    seven_news = seven_news.reverse();
    let day_one: string;
    let day_one_i: number;
    for (let _i = 0; _i < data_array.length; _i++) {
      if (data_array[_i].Confirmed > 0) {
        day_one = data_array[_i].Date;
        day_one_i = _i;
        break;
      }
    }

    let needed_array = data_array.slice(day_one_i);
    let TCs = [];
    let TRs = [];
    let TDs = [];

    for (let _i = 0; _i < needed_array.length; _i++) {
      const el = needed_array[_i];
      TCs.push(el.Confirmed);
      TRs.push(el.Recovered);
      TDs.push(el.Deaths);
    }
    return {
      Name: data_array[0].Country,
      Table: sum_t,
      SevenNews: seven_news,
      SevenLabel: this.all_data.get_data_names_7(),
      DayOne: { TCs: TCs, TDs: TDs, TRs: TRs },
      DayOneLabel: this.all_data.get_data_names_from_date(day_one)
    };
  }

  async get_countries_names() {
    let url = 'https://api.covid19api.com/countries';
    let res = await this.http.get(url, { observe: 'response', responseType: 'json' }).toPromise();
    return res.body;
  }

  get_object_frmo_collection_by_key(collection: string, key: string) {
    let now = new Date();
    now.setHours(1);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    let re_v = {};
    this.fireStore.collection(collection).doc(key).get().toPromise().then(all_data => {
      if (all_data.exists) {
        let res = all_data.data();
        if (res.date == now.toISOString()) {
          re_v = res.data;
        }
      }
    });
    return re_v;
  }

  get_country_names() {
    let ref = this.fireStore.collection('countries').doc('names');
    let res = [];
    return ref.get().toPromise().then(data => {
      if (data.exists) {
        res = data.data()['Names'];

        return res;
      } else {
        this.getDataSummary_req().toPromise().then(all => {
          res = []
          all['Countries'].forEach(element => {
            res.push({ Country: element['Country'], Slug: element['Slug'] });
          });
          ref.set({ Names: res }, { merge: true });
          return res;
        });

      }
    });

  }
  // aoutocomplete- material ui

}
