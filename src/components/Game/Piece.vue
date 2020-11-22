<template>
  <div class="piece--size-style" @click="$emit('clicked', piece)">
    <h3 v-if="piece.number > 0" class="ma-0">{{ piece.number }}</h3>
  </div>
</template>

<script>
  export default {
    props: {
      piece: Object,
    },
  };
</script>

<style>
  .piece--size-style {
    width: 50px;
    height: 50px;
    border: 5px #ae9069 solid;
    border-radius: 5px;
    cursor: pointer;
    margin: 1px;
    text-align: center;
  }
</style>
