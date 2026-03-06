<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from './components.card/ProductCard.vue';
import { type Category, Product } from './model/product.model';
import { Cart } from './model/cart.model';

const categoryDefault: Category = { id: 1, name: "Geral" };

const products = ref([
  new Product(1, 'Product 1', 10.99, categoryDefault),
  new Product(2, 'Product 2', 20.99, categoryDefault)
]);

const cart = ref(new Cart());

const addItemToCart = (product: Product) => {
  cart.value.addItem(product, 1);
};

// Remover item do carrinho
const removeItemFromCart = (product: Product) => {
  cart.value.removeItem(product);
};
</script>

<template>
  <main>
    <h1>Lista de Produtos</h1>
    <div v-for="product in products" :key="product.id">
      <ProductCard
        :product="product"
        @add-to-cart="addItemToCart"
      />
    </div>
  </main>

  <aside>
    <h1>🛒 Carrinho</h1>

    <div v-if="cart.getItems().length > 0" class="cart-items-list">

      <div v-for="item in cart.getItems()" :key="item.product.id" class="cart-item">
        <span class="item-name">{{ item.product.name }}</span>

        <div class="item-controls">
          <button class="btn-control" @click="removeItemFromCart(item.product)">-</button>

          <span class="item-quantity">{{ item.quantity }}</span>

          <button class="btn-control" @click="addItemToCart(item.product)">+</button>
        </div>
      </div>

    </div>
    <div v-else>
      <p style="color: #888;">Seu carrinho está vazio.</p>
    </div>

    <hr /> <p><strong>Total de itens:</strong> {{ cart.getTotalItems() }}</p>
    <p><strong>Valor Final:</strong> R$ {{ cart.getFinalPrice().toFixed(2).replace('.', ',') }}</p>
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.cart-items-list {
  margin-bottom: 20px;

}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.item-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-control {
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.btn-control:hover {
  background-color: #ccc;
}

.item-quantity {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

hr {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 15px 0;
}
</style>
