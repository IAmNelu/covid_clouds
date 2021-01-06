import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CovidcService } from '../covidc.service';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { matchingPasswordValidator, PasswordMatchDirective } from '../password-match.directive';

export interface ExampleTab {
    label: string;
    content: string;
}

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
    not_logging = true;
    result_login: string = "";

    asyncTabs: Observable<ExampleTab[]>;
    hideP = true;
    hideC = true;
    hideS = true;

    myControl = new FormControl();
    selectedCountry;
    envelope = faEnvelope;
    no_logged: boolean;
    countries: any;


    signupForm: FormGroup;

    SUemailControl: FormControl = new FormControl("", [Validators.required, Validators.email]);
    SUpasswordControl: FormControl = new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$")]);
    SUpasswordConControl: FormControl = new FormControl("", [Validators.required, matchingPasswordValidator(this.SUpasswordControl)]);
    SUNameControl: FormControl = new FormControl("", [Validators.required]);
    SUSurNameControl: FormControl = new FormControl("", [Validators.required]);

    signInForm: FormGroup;

    SIemailControl: FormControl = new FormControl("", [Validators.required, Validators.email]);
    SIpasswordControl: FormControl = new FormControl("", [Validators.required]);


    filteredOptions: Observable<string[]>;
    constructor(public log_in_s: LoginService, private cs: CovidcService, private router: Router, fb: FormBuilder) {
        this.signupForm = fb.group({
            SUemail: this.SUemailControl,
            SUpassword: this.SUpasswordControl,
            SUpasswordCon: this.SUpasswordConControl,
            SUName: this.SUNameControl,
            SUSurName: this.SUSurNameControl,
        });

        this.signInForm = fb.group({
            SIemail: this.SIemailControl,
            SIPassword: this.SIpasswordControl
        });
    }

    user: User;

    ngOnInit(): void {
        // ($("#loadLogin") as any).modal('toggle');
        this.log_in_s.events$.forEach(_ => {
            this.no_logged = !this.log_in_s.isUserLogged();
            if (!this.no_logged) {
                this.user = JSON.parse(localStorage.getItem("user"));
            }
        });
        this.no_logged = !this.log_in_s.isUserLogged();

        if (!this.no_logged) {
            this.user = JSON.parse(localStorage.getItem("user"));
        }
        this.cs.get_country_names().then(array => {
            this.countries = array;
        });

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        $(".nav-link").click((evt) => {
            evt.preventDefault();
            return false;
        });

    }

    log_in_google() {
        this.log_in_s.signInWithGoogle().then((res) => {

            // $("#close_modal").click();
            this.no_logged = !this.log_in_s.isUserLogged();
            if (!this.no_logged) {
                this.user = JSON.parse(localStorage.getItem("user"));
            }
            this.no_logged = !this.log_in_s.isUserLogged();
            this.log_in_s.newEvent(undefined);
        });
    }

    create_account() {
        this.not_logging = false;
        if (this.signupForm.status == "VALID") {
            ($("#signUpModal") as any).modal('toggle');
            ($("#loadLogin") as any).modal('toggle');
            let password = this.SUpasswordControl.value;
            let email = this.SUemailControl.value;
            let dName = this.SUNameControl.value + ' ' + this.SUSurNameControl.value;
            this.log_in_s.sigUpWithEmailAndPassword(email, password, dName).then(res => {
                this.not_logging = true;
                if (res == "OK") {
                    this.SUemailControl.reset()
                    this.SUpasswordControl.reset()
                    this.SUpasswordConControl.reset()
                    this.SUNameControl.reset()
                    this.SUSurNameControl.reset()

                    this.result_login = "Succesful Login";
                    if (!this.no_logged) {
                        this.user = JSON.parse(localStorage.getItem("user"));
                    }
                    this.no_logged = !this.log_in_s.isUserLogged();
                    this.log_in_s.newEvent(undefined);
                } else {
                    this.result_login = res.message;
                    setTimeout(function () {
                        ($("#signUpModal") as any).modal('toggle');
                    }, 2000);
                }
                setTimeout(function () {
                    if ($('#loadLogin').is(':visible')) {
                        ($("#loadLogin") as any).modal('toggle');
                    }

                }, 2000);

            });
        }
    }

    login_email() {
        this.not_logging = false;
        if (this.signInForm.status == "VALID") {
            ($("#signInModal") as any).modal('toggle');
            ($("#loadLogin") as any).modal('toggle');
            let email = this.SIemailControl.value;
            let password = this.SIpasswordControl.value;
            this.log_in_s.sigInWithEmailAndPassword(email, password).then((res) => {
                this.not_logging = true;
                if (res == "OK") {
                    this.SIemailControl.reset();
                    this.SIpasswordControl.reset();
                    this.result_login = "Succesful Login";
                    this.no_logged = !this.log_in_s.isUserLogged();
                    if (!this.no_logged) {
                        this.user = JSON.parse(localStorage.getItem("user"));
                    }
                    this.no_logged = !this.log_in_s.isUserLogged();
                    this.log_in_s.newEvent(undefined);
                } else {
                    this.result_login = res.message;
                    setTimeout(function () {
                        ($("#signInModal") as any).modal('toggle');
                    }, 2000);
                }
                setTimeout(function () {
                    if ($('#loadLogin').is(':visible')) {
                        ($("#loadLogin") as any).modal('toggle');
                    }
                }, 2000);

            });
        }

    }

    sign_out() {
        localStorage.removeItem("user");
        this.no_logged = true;
        this.user = undefined;
        this.log_in_s.newEvent('something');
    }

    go_to_country(selectedCountry) {
        let current_url = window.location.href

        if (current_url.includes('news')) {
            this.router.navigate(['news/country'], { fragment: selectedCountry });
        } else {
            this.router.navigate(['country'], { fragment: selectedCountry });
        }

    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.countries.filter(option => option.Country.toLowerCase().includes(filterValue));
    }
    displayFn(country): string {
        return country && country.Country ? country.Country : '';
    }

    goTo(clicked) {
        let current_url = window.location.href

        let country: string;
        if (current_url.includes('country')) {
            country = current_url.split('#')[1]
        }
        if (clicked == 'news' && !current_url.includes('news')) {
            if (country) {
                this.router.navigate(['news/country'], { fragment: country });

            } else {
                this.router.navigate(['news']);
            }

        } else if (clicked == 'data' && current_url.includes('news')) {
            if (country) {
                this.router.navigate(['country'], { fragment: country });
            } else {
                this.router.navigate(['']);
            }
        }

    }

}
