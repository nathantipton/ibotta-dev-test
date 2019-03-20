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

  getOffers(): Observable<any> {
    return this.http.get('http://localhost:3000/offers.json');
  }

  getOffer(id: number) {
    return this.http.get(`http://localhost:3000/offers/${id}.json`);
  }

  getRetailerOffers(): Observable<any> {
    return this.http.get('http://localhost:3000/retailer_offers.json');
  }

  getRetailerOffer(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/retailer_offers/${id}.json`);
  }
}
