<script setup lang="ts">
import { store } from '../store'

const handleClick = (e) => {
  e.preventDefault() // Empêche le lien de changer de page

  if (!store.user) {
    store.isLoginOpen = true // Ouvre le Login
  } else {
    store.isMdtOpen = true   // Ouvre le MDT
  }
}
</script>

<template>
  <div class="mdt-btn-container">
    <a href="#" @click="handleClick" class="mdt-btn" :class="{ 'connected': store.user }">
      <span class="icon">
        <svg v-if="!store.user" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H9v-2h6v2zm-3-7l-2.5-2.5L11 7l3.5 3.5L11 14l-1.5-1.5z"/></svg>
      </span>
      <span class="label">
        {{ store.user ? 'OUVRIR MDT' : 'CONNEXION' }}
      </span>
    </a>
  </div>
</template>

<style scoped>
/* (Gardez votre style précédent inchangé) */
.mdt-btn-container { display: flex; align-items: center; margin-left: 10px; }
.mdt-btn { display: flex; align-items: center; gap: 8px; background-color: #34495e; color: #fff; padding: 6px 14px; border-radius: 4px; font-family: 'Oswald', sans-serif; font-weight: bold; text-decoration: none; transition: 0.3s; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.2); }
.mdt-btn:hover { background-color: var(--vp-c-brand); color: #000; transform: translateY(-2px); }
.mdt-btn.connected { background-color: var(--vp-c-brand); color: #000; box-shadow: 0 0 10px rgba(255, 215, 0, 0.4); }
.icon svg { width: 18px; height: 18px; fill: currentColor; }
@media (max-width: 600px) { .label { display: none; } }
</style>