import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer/offer.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "offer/:id", component: OfferComponent},
  { path: '', redirectTo: "/home" , pathMatch: "full"},
  { path: '**', redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
