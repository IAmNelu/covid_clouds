import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SigninBannerComponent } from './signin-banner/signin-banner.component';
import { HomeComponent } from './data-page/home/home.component';
import { SummayTableComponent } from './summay-table/summay-table.component';

import { ChartsModule } from 'ng2-charts';
import { HistogramComponent } from './histogram/histogram.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OneCountryChartsComponent } from './one-country-charts/one-country-charts.component';
import { OneCountryTableComponent } from './one-country-table/one-country-table.component';
import { OneCountryPieChartComponent } from './one-country-pie-chart/one-country-pie-chart.component';
import { OneCountryHistoComponent } from './one-country-histo/one-country-histo.component';
import { OneCountryLineComponent } from './one-country-line/one-country-line.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { NewsGeneralComponent } from './news-general/news-general.component';
import { OneNewComponent } from './one-new/one-new.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateNewModalComponent } from './create-new-modal/create-new-modal.component';
import { EditNewsModalComponent } from './edit-news-modal/edit-news-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PasswordMatchDirective } from './password-match.directive';


@NgModule({
  declarations: [
    AppComponent,
    SigninBannerComponent,
    HomeComponent,
    SummayTableComponent,
    HistogramComponent,
    CountryTableComponent,
    TopBarComponent,
    OneCountryChartsComponent,
    OneCountryTableComponent,
    OneCountryPieChartComponent,
    OneCountryHistoComponent,
    OneCountryLineComponent,
    NewsGeneralComponent,
    OneNewComponent,
    CreateNewModalComponent,
    EditNewsModalComponent,
    PasswordMatchDirective,
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AngularFireStorageModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
