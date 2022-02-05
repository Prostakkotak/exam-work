<template>
  <!-- Тут должна быть форма, но её тут нет -->
  <div class="pt-5">
      <v-row v-for="item in sales" :key="item.id" >
          <SalesItem :salesData="item" />
      </v-row>
  </div>
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
