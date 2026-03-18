<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { type Product } from '../../model/product.model';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  emits: ['add-to-cart']
});
</script>

<template>
  <Card class="product-card">

    <template #header>
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="product-image"
      />
    </template>

    <template #title>
      {{ product.title }}
    </template>

    <template #subtitle>
      {{ product.category.title }}
    </template>

    <template #content>
      <p class="price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</p>
    </template>

    <template #footer>
      <Button
        label="Adicionar ao Carrinho"
        severity="success"
        class="add-btn"
        @click="$emit('add-to-cart', product)"
      />
    </template>

  </Card>
</template>

<style scoped>
.product-card {
  margin-bottom: 16px;
  height: 100%;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  object-position: center;
  padding: 10px;

}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.add-btn {
  width: 100%;
  font-weight: bold;
}
</style>
