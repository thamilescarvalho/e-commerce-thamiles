import { Product } from "./product.model";

export interface CartItem {
    product: Product;
    quantity: number;
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
