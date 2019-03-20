import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer';
import { Retailer } from 'src/app/shared/models/retailer';

@Component({
  selector: 'ibotta-offer-tile, [ibotta-offer-tile] ',
  templateUrl: './offer-tile.component.html',
  styleUrls: ['./offer-tile.component.scss']
})
export class OfferTileComponent implements OnInit {
  @Input() offer: Offer;
  @Output() retailerEmitter: EventEmitter<Retailer> = new EventEmitter<Retailer>();
  constructor() { }

  ngOnInit() {
  }

  getOfferUrlCss():string{
    return `url('${this.offer.image_url}')`
  }

  selectRetailer(retailer: Retailer){
    this.retailerEmitter.emit(retailer)
  }
}
