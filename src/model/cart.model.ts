import { Product } from './product.model'

export interface CartItem {
  product: Product
  quantity: number
}

export class Cart {
  private items: CartItem[] = []

  getItems(): CartItem[] {
    return this.items
  }

  addItem(product: Product, quantity: number): void {
    const itemExists = this.items.some((item) => item.product.id === product.id)

    if (itemExists) {
      const existingItem = this.items.find((item) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      }
    } else {
      this.items.push({ product, quantity })
    }
  }

  // Remover item
  removeItem(product: Product): void {
    const index = this.items.findIndex((item) => item.product.id === product.id)

    if (index !== -1) {
      const existingItem = this.items[index]
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
      } else {
        this.items.splice(index, 1)
      }
    }
  }

  // Remover todas as unidades de uma vez
  deleteItemEntirely(product: Product): void {
    const index = this.items.findIndex((item) => item.product.id === product.id)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  getTotalItems(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0)
  }

  getFinalPrice(): number {
    return this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }
}
