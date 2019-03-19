import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient
  ) { }

  getRetailerOffers():Observable<any>{
    return this.http.get("http://localhost:3000/retailer_offers.json")
  } 
}
