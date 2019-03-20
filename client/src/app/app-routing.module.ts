import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer/offer.component';
import { RetailerComponent } from './retailer/retailer.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "offer/:id", component: OfferComponent},
  { path: "retailer/:id", component: RetailerComponent
},
  { path: '', redirectTo: "/home" , pathMatch: "full"},
  { path: '**', redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
