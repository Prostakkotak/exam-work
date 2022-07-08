<template>
  <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        class="pa-4 my-2 col doctor-card"
        :class="{ 'on-hover': hover }"
      >
      <div class="doctor-card__text">
          <div>ФИО: {{data.name}}</div>
          <div>Должность: {{data.position}}</div>
          <div>Биография: {{data.bio}}</div>
      </div>
      </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.on-hover {
  cursor: pointer;
  transform: scale(1.003);
  transition: 200ms;
}
.link {
  text-decoration: none;
}
</style>