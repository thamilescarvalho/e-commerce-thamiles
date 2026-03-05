export interface Category {
    id: number;
    name: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export type Role = "ADMIN" | "CUSTOMER";

export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public category: Category
    ) {}
}

export class User {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public role: Role
    ) {}
}

export class Cart {
    private items: CartItem[] = [];

    addItem(product: Product, quantity: number): void {
        const itemExists = this.items.some(item => item.product.id === product.id);

        if (itemExists) {
            const existingItem = this.items.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            }
        } else {
            this.items.push({ product, quantity });
        }
    }

    getTotalItems(): number {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    getFinalPrice(): number {
        return this.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    }
}

// Mocks
const categoryTech: Category = { id: 1, name: "Tech" };
const keyboard = new Product(1, "Teclado Mecânico", 350, categoryTech);
const mouse = new Product(2, "Mouse Sem Fio", 120, categoryTech);

const cart = new Cart();
cart.addItem(keyboard, 1);
cart.addItem(mouse, 2);
cart.addItem(keyboard, 1);

console.log("Total items:", cart.getTotalItems());
console.log("Total price: R$", cart.getFinalPrice());