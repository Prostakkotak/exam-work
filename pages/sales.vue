<template>
  <div class="pt-5">
    <v-form v-model="isValid" ref="form" v-if="fields">
      <div v-for="(field, i) in Object.keys(fields)" :key="i">
        <v-text-field
          v-if="fields[field].type === 'string'"
          v-model="formData[field]"
          :rules="[(v) => !!v || 'Нужно заполнить']"
          :label="fields[field].title"
          :placeholder="fields[field].title"
          required
        ></v-text-field>
        <v-select
          v-else-if="fields[field].type === 'select'"
          v-model="formData[field]"
          :rules="[(v) => !!v || 'Нужно заполнить']"
          :items="fields[field].values"
          :label="fields[field].title"
          :placeholder="fields[field].title"
          required
        ></v-select>
      </div>
    </v-form>

    <v-btn :disabled="!isValid" class="mt-5 mb-10" @click="submit">
      Добавить доставку
    </v-btn>
    <v-row v-for="item in sales" :key="item.id">
      <SalesItem :salesData="item" />
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SalesItem from "@/components/SalesItem";

export default {
  name: "SalesPage",
  data: () => ({
    formData: {},
    isValid: false,
  }),
  components: {
    SalesItem,
  },
  computed: {
    ...mapState(["sales", "fields"]),
  },
  methods: {
    ...mapActions(["addSalesItem", "getSales"]),
    async submit() {
      if (!this.isValid) return;

      await this.addSalesItem(this.formData);
      this.$refs.form.reset()
      this.getSales()
    },
  },
};
</script>
<style scoped lang="scss">
</style>
