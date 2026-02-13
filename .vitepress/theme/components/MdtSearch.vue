<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const results = ref([])
const loading = ref(false)
const searched = ref(false) // Pour savoir si on a déjà lancé une recherche

const searchCitizen = async () => {
  if (searchQuery.value.length < 2) return

  loading.value = true
  searched.value = true
  results.value = []

  try {
    // Remplacez par votre IP VPS
    const res = await fetch(`http://ADRESSE_IP_VPS:3000/mdt/search/citizen?name=${searchQuery.value}`)
    const data = await res.json()

    if (data.success) {
      results.value = data.results
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="search-container">
    <h2>📂 RECHERCHE FICHIER CIVIL</h2>

    <div class="search-bar">
      <input
          v-model="searchQuery"
          @keyup.enter="searchCitizen"
          type="text"
          placeholder="Entrez un nom ou prénom..."
      />
      <button @click="searchCitizen" :disabled="loading">
        {{ loading ? '...' : 'RECHERCHER' }}
      </button>
    </div>

    <div v-if="results.length > 0" class="results-grid">
      <div v-for="civ in results" :key="civ.id" class="civ-card" :class="{ wanted: civ.is_wanted }">
        <div class="card-header">
          <h3>{{ civ.nom_prenom }}</h3>
          <span v-if="civ.is_wanted" class="badge-wanted">WANTED</span>
        </div>
        <div class="card-body">
          <p><strong>Né(e) le:</strong> {{ civ.date_naissance }}</p>
          <p><strong>Tel:</strong> {{ civ.telephone }}</p>
          <p><strong>Sexe:</strong> {{ civ.sexe }}</p>
        </div>
        <button class="btn-dossier">VOIR DOSSIER COMPLET</button>
      </div>
    </div>

    <div v-else-if="searched && !loading" class="no-result">
      Aucun citoyen trouvé dans la base de données.
    </div>
  </div>
</template>

<style scoped>
.search-container {
  color: #fff;
  padding: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

input {
  flex: 1;
  padding: 15px;
  background: rgba(0,0,0,0.3);
  border: 1px solid #444;
  color: white;
  font-size: 1.1rem;
}

button {
  padding: 0 30px;
  background: var(--vp-c-brand);
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.civ-card {
  background: rgba(30, 40, 60, 0.8);
  border-left: 5px solid #3498db;
  padding: 15px;
}

.civ-card.wanted {
  border-left-color: #e74c3c;
  background: rgba(60, 20, 20, 0.6);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.badge-wanted {
  background: #c0392b;
  padding: 2px 8px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
  animation: pulse 2s infinite;
}

.btn-dossier {
  width: 100%;
  margin-top: 10px;
  background: #2c3e50;
  color: #ccc;
  font-size: 0.8rem;
}

@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
</style>