import { Component, OnInit, HostListener } from '@angular/core';
import { OfferService } from '../offer/offer.service';
import { RetailerOffer } from '../shared/models/retailer-offer';
import { Offer } from '../shared/models/offer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { Retailer } from '../shared/models/retailer';

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
  constructor(
    private offerService: OfferService,
    private fb: FormBuilder
  ) { }

  get query(): string { return this.searchForm.controls.query.value; }
  get selectedRetailers(): Retailer[] { return this.searchForm.controls.retailers.value; }
  columns: number;
  browserWidth: number;
  offers: RetailerOffer[];
  filteredOffers: RetailerOffer[];
  isLoading: boolean;
  searchForm: FormGroup;
  retailerOptions: Retailer[];
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.browserWidth = event.target.innerWidth;
    this.determineColumns();
  }

  ngOnInit() {
    this.determineColumns();
    this.searchForm = this.fb.group({
      query: '',
      retailers: null
    });
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.filterOffers();
    });
    this.getOffers();
  }

  determineColumns() {
    if (!this.browserWidth) {
      this.browserWidth = window.innerWidth;
    }
    if (this.browserWidth >= 1280) {
      this.columns = 4;
    } else if (this.browserWidth > 1024) {
      this.columns = 3;
    } else {
      this.columns = 2;
    }
  }

  getOffers() {
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
        );
      });
      this.getRetailers();
      this.filterOffers();
      this.isLoading = false;
    });
  }

  getRetailers() {
    this.retailerOptions = [];
    this.offers.forEach(offer => {
      if (this.retailerOptions.map(x => x.id).indexOf(offer.retailer.id) === -1) {
        this.retailerOptions.push(offer.retailer);
      }
    });

    this.retailerOptions.sort((a, b) => {
      return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
    });
  }

  filterOffers() {
    this.filteredOffers = this.offers.filter(x => {
      return (
        ((this.query.length > 0) ? this.searchOffersByQuery(x) : true) &&
        ((this.selectedRetailers && this.selectedRetailers.length > 0) ? this.selectedRetailers.map(r => r.id).indexOf(x.retailer.id) > -1 : true)
      );
    }).sort((a, b) => {
      return (a.retailer.name < b.retailer.name) ? -1 : (a.retailer.name > b.retailer.name) ? 1 : 0;
    });
  }

  searchOffersByQuery(offer: RetailerOffer): boolean {
    return (
      (offer.offer.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) ||
      (offer.offer.description.toLowerCase().indexOf(this.query.toLowerCase()) > -1) ||
      (offer.offer.terms.toLowerCase().indexOf(this.query.toLowerCase()) > -1) ||
      ((offer.retailer) ? (offer.retailer.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) : false)
    );
  }
}
