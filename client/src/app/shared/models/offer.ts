export class Offer {
    id: number;
    name: string;
    description: string;
    terms: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    constructor(
        id: number,
        name: string,
        description: string,
        terms: string,
        image_url: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.terms = terms;
        this.image_url = image_url;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

