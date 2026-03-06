<script setup lang="ts">

import type { Category } from '../model/product.model';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';

// Testes (Mocks)
const categoryTech: Category = { id: 1, name: "Tech" };
const keyboard = new Product(1, "Teclado Mecânico", 350, categoryTech);
const mouse = new Product(2, "Mouse Sem Fio", 120, categoryTech);

// Adicionando ao carrinho
const cart = new Cart();
cart.addItem(keyboard, 1);
cart.addItem(mouse, 2);
cart.addItem(keyboard, 1); // Testando se acumula sem duplicar

console.log("Total items no Front:", cart.getTotalItems());
console.log("Total price no Front: R$", cart.getFinalPrice());
</script>

<template>
  <main class="container">
    <h1>🛒 Meu E-commerce em Vue</h1>

    <div class="cart-summary">
      <h3>Resumo da Compra:</h3>
      <p><strong>Total de itens:</strong> {{ cart.getTotalItems() }} unidades</p>
      <p><strong>Valor Final:</strong> R$ {{ cart.getFinalPrice() }}</p>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.cart-summary {
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
  max-width: 400px;
}

h1 {
  color: #2c3e50;
}
</style>
