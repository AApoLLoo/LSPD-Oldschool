<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const matricule = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = () => {
  if (!matricule.value || !password.value) {
    error.value = "CHAMPS REQUIS MANQUANTS"
    return
  }

  // Simulation de connexion
  loading.value = true
  error.value = ''

  setTimeout(() => {
    loading.value = false
    // Pour l'exemple, on accepte tout, ou tu peux mettre une condition
    // router.go('/') // Redirige vers l'accueil
    alert(`BIENVENUE OFFICIER ${matricule.value}. ACCÈS AUTORISÉ.`)
  }, 1500)
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <h1 class="glitch-text">LSPD INTRANET</h1>
        <div class="scan-line"></div>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label>MATRICULE</label>
          <input v-model="matricule" type="text" placeholder="Ex: 92" :disabled="loading" />
        </div>

        <div class="input-group">
          <label>MOT DE PASSE</label>
          <input v-model="password" type="password" placeholder="••••••••" :disabled="loading" />
        </div>

        <div v-if="error" class="error-msg">⚠️ {{ error }}</div>

        <button type="submit" :class="{ 'loading': loading }">
          {{ loading ? 'CONNEXION EN COURS...' : 'ACCÉDER AU TERMINAL' }}
        </button>
      </form>

      <div class="login-footer">
        <a href="#">DEMANDER UNE ACCRÉDITATION</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* On isole le CSS ici pour ne pas casser le reste du site */
.login-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.login-card {
  background: rgba(10, 25, 47, 0.9);
  border: 1px solid var(--vp-c-brand);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  position: relative;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.login-header h1 {
  color: var(--vp-c-brand);
  font-family: 'Oswald', sans-serif;
  text-align: center;
  margin: 0 0 30px 0;
  font-size: 2rem;
  letter-spacing: 2px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  color: var(--vp-c-text-2);
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 12px;
  background: #051020;
  border: 1px solid #1d3557;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
}

input:focus {
  border-color: var(--vp-c-brand);
  outline: none;
}

button {
  width: 100%;
  padding: 15px;
  background: var(--vp-c-brand);
  color: #000;
  font-weight: bold;
  font-family: 'Oswald', sans-serif;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  text-transform: uppercase;
}

button:hover:not(.loading) {
  background: #fff;
  transform: translateY(-2px);
}

button.loading {
  background: #333;
  color: #fff;
  cursor: wait;
}

.error-msg {
  color: #ff4444;
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 0.9rem;
  animation: shake 0.5s;
}

.login-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 0.8rem;
}

.login-footer a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-bottom: 1px dotted var(--vp-c-text-2);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>