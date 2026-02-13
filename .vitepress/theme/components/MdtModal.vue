<script setup lang="ts">
import { store } from '../store'
import MdtDashboard from './MdtDashboard.vue'
</script>

<template>
  <Transition name="slide-up">
    <div v-if="store.user && store.isMdtOpen" class="mdt-overlay">

      <button class="close-overlay-btn" @click="store.isMdtOpen = false" title="Réduire">
        ✖ FERMER
      </button>

      <div class="mdt-content">
        <MdtDashboard :user="store.user" @logout="store.logout()" />
      </div>

    </div>
  </Transition>
</template>

<style scoped>
.mdt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(5, 16, 32, 0.95); /* Fond très opaque */
  z-index: 9999; /* Au-dessus de tout */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.close-overlay-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  background: #c0392b;
  color: white;
  border: none;
  padding: 5px 15px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10000;
  border-radius: 4px;
}

.mdt-content {
  flex: 1;
  overflow-y: auto; /* Permet de scroller si le contenu est long */
  padding: 20px;
}

/* Animation d'ouverture (glissement vers le haut) */
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%); /* Part du bas de l'écran */
}
</style>