<template>
  <v-row class="page-info-wrap pt-5">
      <p class="pa-4 pt-6">
        {{ pagesData.home && pagesData.home.text }}
      </p>
      <img :src="pagesData.home && pagesData.home.image" alt="" />
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "IndexPage",
  computed: {
    ...mapState(["pagesData"]),
  },
};
</script>
<style scoped lang="scss">
.page-info-wrap {
  display: flex;
  flex-wrap: nowrap;

  > img {
    max-width: 45%;
    height: 100%;
  }
}
</style>
