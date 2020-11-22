<template>
  <v-app class="app--style">
    <v-main>
      <start />
    </v-main>
  </v-app>
</template>

<script>
  import Start from "./components/Start.vue";

  export default {
    components: {
      Start,
    },
  };
</script>
<style>
  .app--style {
    font-family: "Open Sans", sans-serif;
    text-align: left;
    margin: auto;
    padding-top: 10%;
    width: fit-content;
  }
</style>
