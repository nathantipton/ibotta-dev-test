import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { Offer } from 'src/app/shared/models/offer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ibotta-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  offer: Offer;
  isLoading: boolean;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    if (this.route.snapshot.params.id) {
      this.offerService.getOffer(this.route.snapshot.params.id).subscribe((offer: any) => {
        this.offer = new Offer(
          offer.id,
          offer.name,
          offer.description,
          offer.terms,
          offer.image_url,
          offer.created_at,
          offer.updated_at
          );
        this.isLoading = false;
      });
    } else {
      this.router.navigate(['/home']);
    }
    // this.offerService.getOffer()
  }

}
