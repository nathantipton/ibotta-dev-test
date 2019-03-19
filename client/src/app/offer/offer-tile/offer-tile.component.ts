import { Component, OnInit, Input } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer';

@Component({
  selector: 'ibotta-offer-tile, [ibotta-offer-tile] ',
  templateUrl: './offer-tile.component.html',
  styleUrls: ['./offer-tile.component.scss']
})
export class OfferTileComponent implements OnInit {
  @Input() offer: Offer;

  constructor() { }

  ngOnInit() {
  }

  getOfferUrlCss():string{
    return `url('${this.offer.image_url}')`
  }

}
