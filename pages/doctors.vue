<template>
  <v-row class="pt-5 doctors-list" v-if="doctors.length !== 0">
    <DoctorCard
      v-for="doctor in doctors"
      :data="doctor"
      :key="doctor.id"
      class="doctors-list__card"
    />
  </v-row>
  <v-row v-else> loading... </v-row>
</template>

<script>
import { mapState } from "vuex";
import DoctorCard from "@/components/DoctorCard";

export default {
  name: "DoctorsPage",
  components: {
    DoctorCard,
  },
  computed: {
    ...mapState(["doctors"]),
  },
};
</script>
<style scoped lang="scss">
.doctors-list {
  display: flex;
  gap: 16px;

  &__card {
    min-width: 300px;
    min-height: 150px;
  }
}
</style>
