class OffersController < ApplicationController

  # GET /offers
  # GET /offers.json
  def index
    @offers = Offer.all
  end

end
