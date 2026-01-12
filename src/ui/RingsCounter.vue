<script setup lang="ts">
import { ref } from 'vue';
import { EventBus } from '../game/EventBus';

const rings = ref(0);

EventBus.on('rings-collected', (ringsCollected: number) => {
  rings.value = ringsCollected;
});
</script>

<template>
  <div :class="$style['rings-counter']">
    <span :class="$style['rings-counter__counter']">{{ rings }}</span>
    
    <img
      :class="$style['rings-counter__ring']"
      src="../../public/assets/ring.png" 
      alt=""
    >
  </div>
</template>

<style lang="scss" module>
.rings-counter {
  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;

  &__ring {
    width: 32px;
    height: 32px;
  }

  &__counter {
    color: white;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>