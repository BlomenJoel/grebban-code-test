<template>
  <div class="modal--size pa-5">
    <div class="d-flex">
      <h2 class="pb-5">{{ feedback.title }}</h2>
      <v-spacer />
      <v-btn @click="$emit('clicked-close')" icon>
        x
      </v-btn>
    </div>
    <p class="py-5">{{ feedback.message }}</p>
    <v-btn v-if="feedback.won" @click="$emit('clicked-play-again')"
      >Play again</v-btn
    >
  </div>
</template>

<script>
  export default {
    props: {
      feedback: Object,
    },
  };
</script>

<style scoped>
  .modal--size {
    width: 100%;
    border-radius: 5px;
    position: absolute;
    top: 10%;
    border: grey 1px solid;
    background: white;
  }
  @media only screen and (max-width: 600px) {
    .modal--size {
      width: 90%;
      top: 0;
    }
  }
  .exit-button--position {
    position: relative;
  }
</style>
