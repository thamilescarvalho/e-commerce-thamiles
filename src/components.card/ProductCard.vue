<script setup lang="ts">
// 1. Importando o tipo com a sintaxe correta
import { type Product } from '../model/product.model';

// 2. Definindo que este componente vai receber um "product"
defineProps<{
  product: Product
}>();

// 3. Definindo o "grito" (evento) que este componente pode emitir
defineEmits(['add-to-cart']);
</script>

<template>
  <article class="card">
    <h2>{{ product.name }}</h2>
    <p class="category">{{ product.category.name }}</p>

    <p class="price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</p>

    <button @click="$emit('add-to-cart', product)">Adicionar ao carrinho</button>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category {
  font-size: 0.8rem;
  color: #666;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

button:hover {
  background-color: #33a06f;
}
</style>
