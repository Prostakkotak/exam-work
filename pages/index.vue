<template>
  <v-row class="pt-5" style="flex-direction: column" v-if="services.results">
    <v-row class="filters-row">
          <div class="display-1" style="width: 100%">Список услуг ветклиники</div>
      <div class="title">Фильтры</div>
      <v-form class="filters mt-10 mb-12">
        <v-row style="width: 100%; gap: 32px">
          <v-select
            :label="'Категория (пустая категория для сброса)'"
            v-model="category"
            :items="categories"
          >
          </v-select>

          <v-text-field
            filled
            placeholder="Поиск по названию (нечуствителен к регистру)"
            v-model="searchInput"
          ></v-text-field>
        </v-row>

        <v-range-slider
          :color="'green'"
          class="filters__range"
          :label="'Ценовой диапазон'"
          hint="Лимиты выставляются автоматически"
          :min="minPrice"
          :max="maxPrice"
          @end="changeCurrentPriceRange"
          v-model="priceRange"
          thumb-label="always"
        ></v-range-slider>
      </v-form>
    </v-row>

    <v-row>
      <v-select
        :label="'Сортировка по цене'"
        :items="['По умолчанию', 'По возрастанию', 'По убыванию']"
        v-model="priceSortMode"
      ></v-select>
    </v-row>

    <v-row class="services-list">
      <ServiceCard
        v-for="doctor in filteredServices"
        :data="doctor"
        :key="doctor.id"
        :placeholder="'Категория'"
        class="services-list__card"
      />
    </v-row>
    <v-pagination
      class="mt-5 pagination"
      v-model="page"
      @input="onPageChange"
      :length="Math.ceil(services.count / 10)"
    ></v-pagination>
  </v-row>
  <v-row v-else> loading... </v-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
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
      "Хирургия",
    ],
    priceRange: [0, 0],
    currentMinPrice: 0,
    currentMaxPrice: 0,
    searchInput: "",
    page: 1,
    priceSortMode: 'По умолчанию'
  }),
  computed: {
    ...mapState(["services"]),
    minPrice() {
      return this.sortByPrice("increase")[0]?.price;
    },
    maxPrice() {
      return this.sortByPrice("decrease")[0]?.price;
    },
    filteredServices() {
      let list = [...(this.services.results || [])].filter((e) => {
        if (
          this.currentMinPrice !== this.currentMaxPrice &&
          (e.price < this.currentMinPrice || e.price > this.currentMaxPrice)
        ) {
          return false;
        } else if (this.category && e.category !== this.category) {
          return false;
        } else if (
          this.searchInput &&
          !e.name.toLowerCase().includes(this.searchInput.toLowerCase())
        ) {
          return false;
        }

        return true;
      });

      if (this.priceSortMode === 'По умолчанию') {
        return list
      } else if (this.priceSortMode === "По возрастанию") {
        return list.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        return list.sort((a, b) => {
          return b.price - a.price;
        });
      }
    },
  },
  methods: {
    ...mapActions(["getServices"]),
    ...mapMutations(["SET_SERVICES"]),
    async onPageChange(page) {
      await this.getServices(page - 1);
      await this.$nextTick();

      this.priceRange = [this.minPrice, this.maxPrice];
      this.changeCurrentPriceRange();
    },
    changeCurrentPriceRange() {
      this.currentMinPrice = this.priceRange[0];
      this.currentMaxPrice = this.priceRange[1];
    },
    sortByPrice(mode = "increase") {
      const list = [...(this.services.results || [])];

      if (mode === "increase") {
        return list.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        return list.sort((a, b) => {
          return b.price - a.price;
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;

  &__range {
    flex-grow: 4;
    width: 100%;
  }
}

.services-list {
  display: flex;
  gap: 16px;

  &__card {
    min-width: 250px;
    min-height: 150px;
  }
}
</style>
