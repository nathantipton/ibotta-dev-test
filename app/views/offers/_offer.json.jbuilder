json.extract! offer, :id, :name, :description, :terms, :image_url, :created_at, :updated_at
json.url offer_url(offer, format: :json)
