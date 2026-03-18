import type { App } from "vue";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import Button from "primevue/button"
import Card from "primevue/card";

import DataView from "primevue/dataview";
import InputNumber from "primevue/inputnumber";

export function setPrimeVue(app:App):void {
  app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
// componentes globais
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Button', Button);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Card', Card);

app.component('DataView', DataView);
app.component('InputNumber', InputNumber);
}
