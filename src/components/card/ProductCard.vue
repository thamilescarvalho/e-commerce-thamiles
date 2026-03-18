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
  <Card class="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-xl border border-gray-100">

    <template #header>
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="w-full h-52 object-contain p-4"
      />
    </template>

    <template #title>
      <h2 class="text-xl font-bold text-gray-800">{{ product.title }}</h2>
    </template>

    <template #subtitle>
      <span class="text-sm text-gray-500">{{ product.category.title }}</span>
    </template>

    <template #content>
      <p class="text-2xl font-bold text-slate-700 m-0">
        R$ {{ product.price.toFixed(2).replace('.', ',') }}
      </p>
    </template>

    <template #footer>
      <Button
        label="Adicionar"
        severity="success"
        class="w-full font-bold py-2"
        @click="$emit('add-to-cart', product)"
      />
    </template>
  </Card>
</template>

<style scoped></style>
