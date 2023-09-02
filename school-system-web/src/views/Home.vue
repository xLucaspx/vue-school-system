<template>
  <v-app>
    <NavDrawer></NavDrawer>
    <AppBar>
      <template v-slot:title>Home</template>
    </AppBar>

    <v-main>
      <div class="home" app>
        <v-card color="indigo darken-4" class="home__card">
          <v-card-text>
            <p class="text-h6 text--primary">Vue.js Web App</p>
          </v-card-text>

          <v-card-actions>
            <RouterLink to="/students" class="link">
              <v-btn
                stacked
                variant="outlined"
                prepend-icon="mdi-account-school-outline"
              >
                Student information
              </v-btn>
            </RouterLink>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import AppBar from "@/components/AppBar";
import NavDrawer from "@/components/NavDrawer";

export default defineComponent({
  name: "Home",
  components: {
    AppBar,
    NavDrawer,
  },
});
</script>

<style scoped>
.home {
  height: 100%;
  background-image: url("../assets/img/home-bg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 40%;
  display: flex;
  justify-content: flex-start;
  padding: 3.5rem;
}

.home__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 160px;
}

.link {
  color: #fff;
}
</style>
