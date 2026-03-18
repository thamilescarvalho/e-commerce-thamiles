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
  <div class="flex flex-col lg:flex-row gap-10 p-6 md:p-10 max-w-[1400px] mx-auto font-mono">

    <main class="flex-1 w-full">
      <h1 class="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">Lista de Produtos</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id">
          <ProductCard
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </main>

    <aside class="w-full lg:w-[450px] bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-lg sticky top-8 h-fit" :key="cartTrigger">
      <h1 class="text-2xl font-bold text-slate-800 mb-6">🛒 Carrinho</h1>

      <div v-if="cart.getItems().length > 0">

        <DataView :value="cart.getItems()">
          <template #list="slotProps">
            <div class="flex flex-col gap-3">

              <div v-for="item in slotProps.items" :key="item.product.id" class="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm gap-4">

                <div class="flex items-center gap-3 w-full sm:w-auto">
                  <img :src="item.product.imageUrl" :alt="item.product.title" class="w-14 h-14 object-contain bg-slate-50 rounded-md border border-slate-100 p-1" />
                  <div class="flex flex-col">
                    <span class="font-bold text-sm text-slate-800">{{ item.product.title }}</span>
                    <span class="text-sm text-orange-600 font-bold mt-1">
                      R$ {{ (item.product.price * item.quantity).toFixed(2).replace('.', ',') }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-7 w-full sm:w-auto justify-end">

                  <InputNumber
                    v-model="item.quantity"
                    showButtons
                    buttonLayout="horizontal"
                    :min="1"
                    class="w-24 h-8"
                    inputClass="w-10 text-center font-bold text-sm"
                    @update:modelValue="cartTrigger++"
                  >
                    <template #incrementbuttonicon>
                      <span class="font-bold">+</span>
                    </template>
                    <template #decrementbuttonicon>
                      <span class="font-bold">-</span>
                    </template>
                  </InputNumber>

                  <button class="w-8 h-8 flex items-center justify-center text-red-600 rounded-md transition-colors shadow-inner ml-4" @click="deleteEntireItem(item.product)">🗑️
                    </button>
                </div>
              </div>
            </div>
          </template>
        </DataView>

      </div>

      <div v-else class="text-slate-500 text-center py-8">
        <p>Seu carrinho está vazio.</p>
      </div>

      <hr class="border-t border-slate-200 my-6" />

      <div class="space-y-3">
        <p class="flex justify-between text-lg text-slate-700">
          <span>Total de itens:</span>
          <strong class="text-slate-900">{{ cart.getTotalItems() }}</strong>
        </p>
        <p class="flex justify-between text-lg text-slate-700">
          <span>Valor Final:</span>
          <strong class="text-xl text-green-600">R$ {{ cart.getFinalPrice().toFixed(2).replace('.', ',') }}</strong>
        </p>
      </div>
    </aside>

  </div>
</template>

<style scoped></style>
