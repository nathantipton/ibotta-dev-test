import { Retailer } from './retailer';
import { Offer } from './offer';

export class RetailerOffer {
    id: number;
    retailer: Retailer;
    offer: Offer;
    created_at: Date;
    updated_at: Date;
    constructor(
        id: number,
        retailer: Retailer,
        offer: Offer,
        created_at: Date,
        updated_at: Date
    ){ 
        this.id = id;
        this.retailer  = retailer;
        this.offer = offer;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
