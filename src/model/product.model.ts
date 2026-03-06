export interface Category {
    id: number;
    name: string;
}

export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public category: Category
    ) {}
}
