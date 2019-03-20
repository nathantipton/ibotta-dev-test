import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer/offer.service';
import { RetailerOffer } from '../shared/models/retailer-offer';
import { Offer } from '../shared/models/offer';
import { FormGroup, FormBuilder } from '@angular/forms';
import{ debounceTime} from 'rxjs/operators';
import {trigger, transition, style, animate} from '@angular/animations';
import { Retailer } from '../shared/models/retailer';
import { RetailerService } from '../retailer/retailer.service';

@Component({
  selector: 'ibotta-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-25%)', opacity: 0 }),
        animate('.25s 0s cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('scaleInOut', [
      transition(':enter', [
        style({ transform: 'scale(.8)', opacity: 0 }),
        animate('.25s 0s cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('.25s 0s cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'scale(.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  offers: RetailerOffer[];
  filteredOffers: RetailerOffer[];
  isLoading: boolean;
  searchForm: FormGroup;
  selectedRetailers: Retailer[];

  constructor(
    private offerService: OfferService,
    private retailerService: RetailerService,
    private fb: FormBuilder
  ) {   }

  get query(): string {return this.searchForm.controls.query.value}

  ngOnInit() {
    this.selectedRetailers = [];
    this.searchForm = this.fb.group({
      query: ''
    })
    this.searchForm.controls.query.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.filterOffers();
    })

    this.isLoading = true;
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
      this.filterOffers();
      this.isLoading = false;
    })
  }

  filterOffers(){
    this.filteredOffers = this.offers.filter(x=>{
      console.log(this.query)
      return (
       (this.query.length > 0 ) ? this.searchOffersByQuery(x) : true
      )
    }).sort((a,b)=>{
      return (a.retailer.name < b.retailer.name) ? -1 : (a.retailer.name > b.retailer.name) ? 1 : 0;
    })
  }

  searchOffersByQuery(offer: RetailerOffer): boolean{
    return(
      (offer.offer.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) ||
      (offer.offer.description.toLowerCase().indexOf(this.query.toLowerCase()) > -1) ||
      (offer.offer.terms.toLowerCase().indexOf(this.query.toLowerCase()) > -1) ||
      ((offer.retailer) ? (offer.retailer.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) : false)
    )
  }

  selectRetailer(retailer: Retailer){
    this.selectedRetailers.push(retailer);
  }
}
