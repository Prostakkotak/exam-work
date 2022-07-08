<template>
  <v-row class="pt-5">
      
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DoctorsPage",
  computed: {
    ...mapState(["pagesData"]),
  },
};
</script>
<style scoped lang="scss">
</style>
