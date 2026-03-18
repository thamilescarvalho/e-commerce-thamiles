<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './components/card/ProductCard.vue';
import { type Category, Product } from './model/product.model';
import { Cart } from './model/cart.model';

export default defineComponent({
  name: 'App',
  components: {
    ProductCard
  },
  data() {
    // Categorias
    const catEletronicos: Category = { id: 1, title: "Eletrônicos" };
    const catMonitores: Category = { id: 2, title: "Monitores" };
    const catPlacasMae: Category = { id: 3, title: "Placas-Mãe" };
    const catGabinetes: Category = { id: 4, title: "Gabinetes" };
    const catNotebooks: Category = { id: 5, title: "Notebooks" };

    return {
      products: [
        new Product(1, 'Notebook Dell Core i7', 'Notebook Dell Core i7', 4500.00, 0.1, catNotebooks,'/Notebook-Dell-Core.jpg'),
        new Product(2, 'Monitor LG Ultrawide 29"', 'Monitor LG Ultrawide 29"', 1200.50, 0, catMonitores,'/monitor-lg.jpg'),
        new Product(3, 'Placa-Mãe ASUS TUF B550M', 'Placa-Mãe ASUS TUF B550M', 950.00, 0, catPlacasMae,'/placa-asus.jpg'),
        new Product(4, 'Gabinete Gamer Ninja', 'Gabinete Gamer Ninja', 250.00, 0, catGabinetes,'/gabinete-ninja.jpg'),
        new Product(5, 'Mouse Logitech G703', 'Mouse Logitech G203', 150.00, 0, catEletronicos,'/mouse703.jpg'),
      ],
      // Instanciando a Model Rica
      cart: new Cart(),
      cartTrigger: 0 // reatividade pra forçar o Vue
    };
  },
  methods: {
    addToCart(product: Product) {
      this.cart.addItem(product, 1);
      this.cartTrigger++;
    },
    removeItemFromCart(product: Product) {
      this.cart.removeItem(product);
      this.cartTrigger++;
    },
    deleteEntireItem(product: Product) {
      this.cart.deleteItemEntirely(product);
      this.cartTrigger++;
    }
  }
});
</script>

<template>
  <div class="store-layout">

    <main class="products-section">
      <h1 class="section-title">Lista de Produtos</h1>
      <div v-for="product in products" :key="product.id">
        <ProductCard
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </main>

    <aside class="cart-section" :key="cartTrigger">
      <h1 class="section-title">Carrinho</h1>

      <div v-if="cart.getItems().length > 0">
        <div v-for="item in cart.getItems()" :key="item.product.id" class="cart-item">

          <div class="item-info">
            <span class="item-name">{{ item.product.title }}</span>
            <span class="item-price">R$ {{ (item.product.price * item.quantity).toFixed(2).replace('.', ',') }}</span>
          </div>

          <div class="item-controls">
            <button class="btn-control" @click="removeItemFromCart(item.product)">-</button>

            <span class="item-quantity">{{ item.quantity }}</span>

            <button class="btn-control" @click="addToCart(item.product)">+</button>

            <button class="btn-control delete-btn" @click="deleteEntireItem(item.product)">🗑️</button>
          </div>

        </div>
      </div>

      <div v-else class="empty-cart">
        <p>Seu carrinho está vazio.</p>
      </div>

      <hr class="divider" />

      <div class="cart-summary">
        <p>Total de itens: <strong>{{ cart.getTotalItems() }}</strong></p>
        <p>Valor Final: <strong>R$ {{ cart.getFinalPrice().toFixed(2).replace('.', ',') }}</strong></p>
      </div>
    </aside>

  </div>
</template>

<style scoped>

.store-layout {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  padding: 40px 20px;

  font-family: monospace;

  max-width: 1000px;
  margin: 0 auto;
}

.products-section {
  flex: 1;
  max-width: 550px;
}

.cart-section {
  width: 100%;
  max-width: 350px;
  background-color: #f8f9fa;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  position: sticky;
  top: 40px;
}

.section-title {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 24px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: bold;
  font-size: 0.95rem;
}

.item-price {
  font-size: 0.85rem;
  color: #e67e22;
  margin-top: 4px;
}

/* Botões de mais e menos */
.item-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 2px 4px;
  width: auto;
}

.btn-control {
  background-color: transparent;
  border: none;
  width: 24px;
  height: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #555;
}

.btn-control:hover {
  background-color: #ddd;
  border-radius: 4px;
}

.item-quantity {
  font-weight: bold;
  font-size: 0.9rem;
  min-width: 16px;
  text-align: center;
}

.empty-cart {
  color: #777;
  text-align: center;
  padding: 20px 0;
}

.divider {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.cart-summary p {
  margin: 5px 0;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
}
</style>
