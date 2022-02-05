<template>
  <div class="pt-5">
    <v-row>
        <v-col>
          <v-text-field
            v-model="type"
            :counter="15"
            label="Тип доставки (truck, plane, train, )"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="departure_city"
            :counter="30"
            label="Город отправителя"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="departure_address"
            :counter="50"
            label="Адрес отправителя"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="destination_city"
            :counter="30"
            label="Город назначения"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="destination_address"
            :counter="50"
            label="Адрес назначения"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="weight"
            :counter="10"
            label="Вес (кг)"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="volume"
            :counter="10"
            label="Объем (м3)"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      
      <v-btn class="mt-5 mb-10" @click="submit"> Добавить комментарий </v-btn>
      <v-row v-for="item in sales" :key="item.id" >
          <SalesItem :salesData="item" />
      </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SalesItem from "@/components/SalesItem";

export default {
  name: "SalesPage",
  components: {
    SalesItem,
  },
  data: () => ({
    type: "",
    departure_city: "",
    departure_address: "",
    destination_city: "",
    destination_address: "",
    weight: "",
    volume: "",
  }),
  computed: {
    ...mapState(["sales"]),
  },
  methods: {
    ...mapActions(["addSalesItem"]),
    submit() {
      this.addSalesItem({
        type: this.type,
        departure_city: this.departure_city,
        departure_address: this.departure_address,
        destination_city: this.destination_city,
        destination_address: this.destination_address,
        weight: this.weight,
        volume: this.volume
      })
    }
  }
};
</script>
<style scoped lang="scss">
</style>
