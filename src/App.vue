<script setup lang="ts">
import { ref } from 'vue';

// 1. Importando o componente (Dica: verifique se o nome da pasta é 'components.card' mesmo ou só 'components')
import ProductCard from './components.card/ProductCard.vue';

// 2. Importando as nossas classes de modelo (Back-end)
import { type Category, Product } from './model/product.model';
import { Cart } from './model/cart.model';

// 3. Criando uma categoria padrão e a nossa lista de produtos (Array usando colchetes [ ])
const categoryDefault: Category = { id: 1, name: "Geral" };

const products = ref([
  new Product(1, 'Product 1', 10.99, categoryDefault),
  new Product(2, 'Product 2', 20.99, categoryDefault)
]);

// 4. Instanciando o nosso carrinho inteligente
const cart = ref(new Cart());

// Função para adicionar itens (que o ProductCard pode chamar)
const addItemToCart = (product: Product) => {
  cart.value.addItem(product, 1);
};
</script>

<template>
  <main>
    <h1>🛍️ Lista de Produtos</h1>
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" @add-to-cart="addItemToCart" />
    </div>
  </main>

  <aside>
    <h1>🛒 Carrinho</h1>
    <p><strong>Total de itens:</strong> {{ cart.getTotalItems() }}</p>
    <p><strong>Valor Final:</strong> R$ {{ cart.getFinalPrice().toFixed(2) }}</p>
  </aside>
</template>

<style scoped>
main {
  float: left;
  width: 60%;
  padding: 20px;
}
aside {
  float: right;
  width: 30%;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
}
</style>
