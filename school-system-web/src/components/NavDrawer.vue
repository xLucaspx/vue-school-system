<template>
  <v-navigation-drawer>
    <v-card class="nav__card">
      <img src="../assets/img/logo.svg" alt="" class="logo" />
    </v-card>

    <v-list nav v-for="(item, i) in items" :key="i">
      <RouterLink :to="item.url" :title="item.title" class="link">
        <v-list-item :value="item" :prepend-icon="item.icon">
          <v-list-item-title
            v-text="item.text"
            class="li__title"
          ></v-list-item-title>
        </v-list-item>
      </RouterLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavDrawer",
  setup() {
    const items = [
      {
        text: "Home",
        icon: "mdi-home-variant-outline",
        url: "/",
        title: "Home",
      },
      {
        text: "Student list",
        icon: "mdi-account-school-outline",
        url: "/students",
        title: "See the list of students",
      },
      {
        text: "Register student",
        icon: "mdi-account-plus-outline",
        url: "/students/register",
        title: "Register a new student",
      },
    ];

    return { items };
  },
});
</script>

<style scoped>
.nav__card {
  text-align: center;
}

.logo {
  max-width: 185px;
  max-height: 70px;
  margin: 1rem auto;
}

.link {
  color: #888;
}

.link.router-link-active {
  color: #000;
  font-weight: 700;
}

@media screen and (max-width: 1100px) {
  .logo {
    display: none;
  }
}
</style>
