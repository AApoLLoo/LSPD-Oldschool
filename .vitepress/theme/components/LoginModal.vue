<script setup lang="ts">
import { store } from '../store'
import LspdLogin from './LspdLogin.vue'

// On initialise le store au montage pour vérifier si déjà connecté
store.init()
</script>

<template>
  <Transition name="fade">
    <div v-if="store.isLoginOpen && !store.user" class="modal-overlay" @click.self="store.isLoginOpen = false">
      <div class="modal-content">
        <button class="close-btn" @click="store.isLoginOpen = false">×</button>
        <LspdLogin @login-success="(user) => store.login(user)" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 9999; /* Au-dessus de tout */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 450px;
  animation: slideUp 0.3s ease-out;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

/* Animations VueJS */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>