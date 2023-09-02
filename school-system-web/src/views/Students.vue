<template>
  <Suspense>
    <RouterView></RouterView>

    <template #fallback>Loading...</template>
  </Suspense>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Students",
});
</script>
