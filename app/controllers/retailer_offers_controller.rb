class RetailerOffersController < ApplicationController
    # GET /retailer_offers
    # GET /retailer_offers.json
    def index
        @retailer_offers = RetailerOffer.all
    end
end
