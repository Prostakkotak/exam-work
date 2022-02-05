<template>
  <!-- Тут должна быть форма, но её тут нету -->
  <v-row class="pt-5">
    <SalesItem v-for="item in sales" :key="item.id" :salesData="item" />
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import SalesItem from "@/components/SalesItem";

export default {
  name: "SalesPage",
  components: {
    SalesItem,
  },
  computed: {
    ...mapState(["sales"]),
  },
};
</script>
<style scoped lang="scss">
</style>
