---
layout: false
---

<script setup>
import { ref, onMounted } from 'vue'
import LspdLogin from '../.vitepress/theme/components/LspdLogin.vue'
import MdtDashboard from '../.vitepress/theme/components/MdtDashboard.vue'

// État de connexion
const isLoggedIn = ref(false)
const currentUser = ref(null)

// Au chargement de la page, on vérifie si une session existe
onMounted(() => {
  const savedUser = localStorage.getItem('mdt_user')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
    isLoggedIn.value = true
  }
})

const handleLoginSuccess = (user) => {
  currentUser.value = user
  isLoggedIn.value = true
  // On sauvegarde l'utilisateur dans le navigateur
  localStorage.setItem('mdt_user', JSON.stringify(user))
}

const handleLogout = () => {
  currentUser.value = null
  isLoggedIn.value = false
  // On supprime la sauvegarde
  localStorage.removeItem('mdt_user')
  localStorage.removeItem('mdt_last_tab') // On reset aussi l'onglet
}
</script>

<div class="mdt-app">
  <LspdLogin v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
  <MdtDashboard v-else :user="currentUser" @logout="handleLogout" />
</div>

<style>
/* Style global pour plein écran */
.mdt-app {
  min-height: 100vh;
  background: #051020;
  padding: 0; /* On retire le padding pour l'immersion totale */
}
</style>