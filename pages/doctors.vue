<template>
  <v-row class="pt-5 wrap" v-if="doctors.length !== 0">
    <v-row style="width: 100%">
      <v-form v-model="isValid" class="form">
        <v-text-field
          :rules="[(v) => !!v || 'Нужно заполнить']"
          class="form__input"
          v-model="name"
          :label="'ФИО'"
          :placeholder="'ФИО'"
        />
        <v-text-field
          :rules="[(v) => !!v || 'Нужно заполнить']"
          class="form__input"
          v-model="position"
          :label="'Должность'"
          :placeholder="'Должность'"
        />
        <v-textarea
          :rules="[(v) => !!v || 'Нужно заполнить']"
          class="form__input"
          v-model="bio"
          :label="'Биография'"
          :placeholder="'Биография'"
        />
      </v-form>
    </v-row>
    <v-btn @click="onSubmit" class="mb-10" :disabled="!isValid">Добавить врача</v-btn>
    <v-row class="doctors-list">
      <DoctorCard
        v-for="doctor in doctors.results"
        :data="doctor"
        :key="doctor.id"
        class="doctors-list__card"
      />
    </v-row>
    <v-pagination
      class="mt-5 pagination"
      v-model="page"
      @input="onPageChange"
      :length="Math.ceil(doctors.count / 10)"
    ></v-pagination>
  </v-row>
  <v-row v-else> loading... </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DoctorCard from "@/components/DoctorCard";

export default {
  name: "DoctorsPage",
  components: {
    DoctorCard,
  },
  data: () => ({
    name: "",
    position: "",
    bio: "",
    isValid: false,
    page: 1
  }),
  computed: {
    ...mapState(["doctors"]),
  },
  methods: {
    ...mapActions(["addDoctor", "getDoctors"]),
    async onSubmit() {
      try {
        await this.addDoctor({
          name: this.name,
          position: this.position,
          bio: this.bio,
        });
      } catch (e) {
        console.warn(e);
      }
    },
    onPageChange(page) {
      this.getDoctors(page - 1);
    },
  },
};
</script>
<style scoped lang="scss">
.form {
  width: 100%;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  &__input {
    width: 40%;
  }

  &__textarea {
    width: 100%;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.doctors-list {
  display: flex;
  gap: 16px;

  &__card {
    min-width: 300px;
    min-height: 150px;
  }
}
</style>
