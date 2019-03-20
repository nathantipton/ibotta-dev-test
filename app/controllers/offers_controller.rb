class OffersController < ApplicationController
  # GET /offers
  # GET /offers.json
  def index
    @offers = Offer.all
  end

  def show
    @offer = Offer.find(params[:id])
  end
end
