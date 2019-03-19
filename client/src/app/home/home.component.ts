import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer/offer.service';
import { RetailerOffer } from '../shared/models/retailer-offer';
import { Retailer } from '../shared/models/retailer';
import { Offer } from '../shared/models/offer';

@Component({
  selector: 'ibotta-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offers: RetailerOffer[];
  filteredOffers: RetailerOffer[];

  constructor(
    private offerService: OfferService
  ) { }

  ngOnInit() {
    this.offers = [];
    this.offerService.getRetailerOffers().subscribe(values => {

      this.offers = values.map(x => {
        return new RetailerOffer(
          x.id,
          new Retailer(
            x.retailer.id,
            x.retailer.name,
            x.retailer.created_at,
            x.retailer.updated_at
          ),
          new Offer(
            x.offer.id,
            x.offer.name,
            x.offer.description,
            x.offer.terms,
            x.offer.image_url,
            x.offer.created_at,
            x.offer.updated_at),
          x.created_at,
          x.updated_at
        )
      })
      this.filteredOffers = Object.assign(this.offers, [])
    })
  }
}
