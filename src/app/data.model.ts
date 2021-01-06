export class Data {
    defined_general = false;
    defined_history = false;
    fefined_counties = false;

    total_cases: number;
    total_cases_n: number;
    total_deaths: number;
    total_deaths_n: number;
    total_recovered: number;
    total_recovered_n: number;

    total_from_april_ded: number[] = [];
    total_from_april_rec: number[] = [];
    total_from_april_cas: number[] = [];

    new_ded_7: number[] = [];
    new_cas_7: number[] = [];
    new_rec_7: number[] = [];

    country_data: any[];

    constructor() {

    }

    async populate_fields_global(sum_request) {

        let promise = await sum_request.toPromise();

        let global = promise.Global;
        this.total_cases = global.TotalConfirmed;
        this.total_cases_n = global.NewConfirmed;
        this.total_deaths = global.TotalDeaths;
        this.total_deaths_n = global.NewDeaths;
        this.total_recovered = global.TotalRecovered;
        this.total_recovered_n = global.NewRecovered;
        this.defined_general = true;
    }

    async populate_old(today_r, old_req) {
        let today_p = null;
        try {
            today_p = (await today_r.toPromise()).body[0];
        }
        catch (err) {
            today_p = {
                NewConfirmed: 0,
                NewDeaths: 0,
                NewRecovered: 0,
                TotalConfirmed: 0,
                TotalDeaths: 0,
                TotalRecovered: 0,
                no_yet: true
            }
        }

        let old_p = (await old_req.toPromise()).body;
        old_p.sort((a, b) => parseInt(a.TotalConfirmed) - parseInt(b.TotalConfirmed));
        let six_days = old_p.slice(old_p.length - 6);

        let l_new_cas_7: number[] = [];
        let l_new_ded_7: number[] = [];
        let l_new_rec_7: number[] = [];

        for (let i = 0; i < 6; i++) {
            l_new_cas_7.push(six_days[i].NewConfirmed);
            l_new_ded_7.push(six_days[i].NewDeaths);
            l_new_rec_7.push(six_days[i].NewRecovered);
        }

        l_new_cas_7.push(today_p.NewConfirmed);
        l_new_ded_7.push(today_p.NewDeaths);
        l_new_rec_7.push(today_p.NewRecovered);


        this.new_cas_7 = l_new_cas_7;
        this.new_ded_7 = l_new_ded_7;
        this.new_rec_7 = l_new_rec_7;

        let ll_cas = [];
        let ll_ded = [];
        let ll_rec = [];

        for (let i = 0; i < old_p.length; i++) {
            ll_cas.push(old_p[i].TotalConfirmed);
            ll_ded.push(old_p[i].TotalDeaths);
            ll_rec.push(old_p[i].TotalRecovered);
        }

        ll_cas.sort((a, b) => parseInt(a) - parseInt(b));
        ll_ded.sort((a, b) => parseInt(a) - parseInt(b));
        ll_rec.sort((a, b) => parseInt(a) - parseInt(b));

        if (today_p.no_yet) {
            ll_cas.push(ll_cas[ll_cas.length - 1])
            ll_ded.push(ll_ded[ll_ded.length - 1])
            ll_rec.push(ll_rec[ll_rec.length - 1])

        } else {
            ll_cas.push(today_p.TotalConfirmed);
            ll_ded.push(today_p.TotalDeaths);
            ll_rec.push(today_p.TotalRecovered);
        }


        this.total_from_april_cas = ll_cas;
        this.total_from_april_ded = ll_ded;
        this.total_from_april_rec = ll_rec;

        this.defined_history = true;
    }

    async populate_countries(req) {
        let countries = (await req.toPromise()).Countries;
        this.country_data = countries;
    }

    get_data_names_from_april(): string[] {
        var moment = new Date("2020/04/13");
        let today = new Date();
        today.setHours(0);
        today.setMilliseconds(0);
        today.setMinutes(0);
        today.setSeconds(0);
        let ret_ar = [];
        let splited = moment.toDateString().split(' ');
        ret_ar.push(splited['1'] + ' ' + splited['2']);
        while (true) {
            moment = new Date(moment.setDate(moment.getDate() + 1));
            if (moment >= today) {
                break;
            }
            splited = moment.toDateString().split(' ');

            ret_ar.push(splited['1'] + ' ' + splited['2']);
        }
        splited = today.toDateString().split(' ');
        ret_ar.push(splited['1'] + ' ' + splited['2']);

        return ret_ar;
    }
    get_data_names_7(): string[] {
        var moment = new Date();

        let ret_ar = [];
        let splited = moment.toDateString().split(' ');
        ret_ar.push(splited['1'] + ' ' + splited['2']);

        for (let index = 0; index < 7 - 1; index++) {
            moment = new Date(moment.setDate(moment.getDate() - 1));
            splited = moment.toDateString().split(' ')
            ret_ar.push(splited['1'] + ' ' + splited['2']);
        }
        return ret_ar.reverse();
    }
    get_data_names_from_date(date_iso): string[] {
        var moment = new Date(date_iso);
        let today = new Date();
        today.setHours(0);
        today.setMilliseconds(0);
        today.setMinutes(0);
        today.setSeconds(0);
        let ret_ar = [];
        let splited = moment.toDateString().split(' ');
        ret_ar.push(splited['1'] + ' ' + splited['2']);
        while (true) {
            moment = new Date(moment.setDate(moment.getDate() + 1));
            if (moment >= today) {
                break;
            }
            splited = moment.toDateString().split(' ');

            ret_ar.push(splited['1'] + ' ' + splited['2']);
        }
        splited = today.toDateString().split(' ');
        ret_ar.push(splited['1'] + ' ' + splited['2']);

        return ret_ar;
    }
}