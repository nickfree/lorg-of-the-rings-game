<script setup lang="ts">
import PhaserGame from './PhaserGame.vue';
import RingsCounter from './ui/RingsCounter.vue';
</script>

<template>
  <PhaserGame ref="phaserRef" />

  <RingsCounter />
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;

  image-rendering: pixelated;
}
</style>