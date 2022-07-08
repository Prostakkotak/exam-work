<template>
  <v-row class="pt-5" v-if="services.length !== 0">
    <v-row>
      <v-select :label="'Категория'" v-model="category" :items="categories">
      </v-select>
    </v-row>

    <v-row class="services-list">
      <ServiceCard
        v-for="doctor in services"
        :data="doctor"
        :key="doctor.id"
        :placeholder="'Категория'"
        class="services-list__card"
      />
    </v-row>
  </v-row>
  <v-row v-else> loading... </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ServiceCard from "@/components/ServiceCard";

export default {
  name: "ServicesPage",
  components: {
    ServiceCard,
  },
  data: () => ({
    category: "",
    categories: [
      "",
      "Анестезия",
      "Диагностика",
      "Онкология",
      "ОРИТ",
      "Офтальмология",
      "Процедуры",
      "Стационар",
      "Стерилизация",
      "Стоматология",
      "Терапия",
      "Хирургия"
    ],
  }),
  computed: {
    ...mapState(["services"]),
  },
  methods: {
    ...mapActions(["getServices"]),
  },
};
</script>
<style scoped lang="scss">
.services-list {
  display: flex;
  gap: 16px;

  &__card {
    min-width: 250px;
    min-height: 150px;
  }
}
</style>
