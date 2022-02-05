<template>
  <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        class="pa-4 my-2 col salesItem"
        :class="{ 'on-hover': hover }"
      >
      <div class="salesItem__text-top">
          <span>Из: {{salesData.departure_city}} в: {{salesData.destination_city}}</span>
          <span>{{salesData.type}}</span>
      </div>
      <div class="salesItem__text-mid">
          <div>Адрес отправителя: {{salesData.departure_address}}</div>
          <div>Адрес получателя: {{salesData.destination_address}}</div>
          <div>Вес: {{salesData.weight}} (кг)</div>
          <div>Объем: {{salesData.volume}} (м3)</div>
      </div>
      </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    salesData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.on-hover {
  cursor: pointer;
  transform: scale(1.003);
  transition: 200ms;
}
.link {
  text-decoration: none;
}
</style>