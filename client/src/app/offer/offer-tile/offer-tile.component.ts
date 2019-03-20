import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Retailer } from 'src/app/shared/models/retailer';
import { RetailerOffer } from 'src/app/shared/models/retailer-offer';

@Component({
  selector: 'ibotta-offer-tile, [ibotta-offer-tile] ',
  templateUrl: './offer-tile.component.html',
  styleUrls: ['./offer-tile.component.scss']
})
export class OfferTileComponent implements OnInit {
  @Input() offer: RetailerOffer;
  @Output() retailerEmitter: EventEmitter<Retailer> = new EventEmitter<Retailer>();
  constructor() { }

  ngOnInit() {
  }

  getOfferUrlCss(): string {
    return `url('${this.offer.offer.image_url}')`;
  }

  selectRetailer(retailer: Retailer) {
    this.retailerEmitter.emit(retailer);
  }
}
