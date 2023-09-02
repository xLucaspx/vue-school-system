<template>
  <NotificationAlert></NotificationAlert>
  <RouterView></RouterView>
</template>

<script>
import { defineComponent } from "vue";
import NotificationAlert from "./components/NotificationAlert";

export default defineComponent({
  name: "App",
  components: { NotificationAlert },
});
</script>

<style>
.link {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: inherit;
}
</style>
