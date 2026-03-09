export interface Category {
    id: number;
    title: string;
}

export class Product {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public price: number,
        public discount: number,
        public category: Category
    ) {}
}
