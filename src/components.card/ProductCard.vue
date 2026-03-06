<script setup lang="ts">
import { type Product } from '../model/product.model';

defineProps<{
  product: Product
}>();

// adicionar novamente
defineEmits(['add-to-cart']);
</script>

<template>
  <article class="card">
    <h2>{{ product.name }}</h2>
    <p class="category">{{ product.category.name }}</p>
    <p class="price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</p>

    <div class="actions">
      <button class="add-btn" @click="$emit('add-to-cart', product)">Adicionar</button>
    </div>
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
.actions {
  display: flex;
  margin-top: 10px;
}
button {
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  flex: 1;
}
.add-btn {
  background-color: #42b883;
}
.add-btn:hover {
  background-color: #33a06f;
}
</style>
