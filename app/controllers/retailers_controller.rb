class RetailersController < ApplicationController
    # GET /retailers
    # GET /retailers.json
    def index
        @retailers = Retailer.all
    end
end
