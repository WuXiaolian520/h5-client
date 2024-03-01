<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive include="IndexView,SearchView,NovelView">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
