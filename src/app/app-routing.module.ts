import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsGeneralComponent } from './news-general/news-general.component';
import { OneCountryChartsComponent } from './one-country-charts/one-country-charts.component';

const routes: Routes = [
    //{ path: 'signin', component: SigninComponent },
    //{ path: 'expenses', component: ExpensesComponent},
    //{ path: '', pathMatch: 'full', redirectTo: 'signin' },
    { path: '', component: HomeComponent },
    { path: 'country', component: OneCountryChartsComponent },
    { path: 'news', component: NewsGeneralComponent },
    { path: 'news/country', component: NewsGeneralComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
