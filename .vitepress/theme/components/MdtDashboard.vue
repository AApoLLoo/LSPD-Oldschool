<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MdtSearch from './MdtSearch.vue'

const props = defineProps(['user'])
const emit = defineEmits(['logout'])

// On vérifie s'il y a un onglet sauvegardé, sinon 'home'
const currentTab = ref(localStorage.getItem('mdt_last_tab') || 'home')

// Fonction pour changer d'onglet et sauvegarder la préférence
const switchTab = (tab) => {
  currentTab.value = tab
  localStorage.setItem('mdt_last_tab', tab)
}

const loading = ref(true)
const stats = ref({ reports: [], warrants: [] })

const fetchDashboardData = async () => {
  try {
    // REMPLACEZ PAR VOTRE IP VPS
    const res = await fetch('http://IP_DE_VOTRE_VPS:3000/dashboard/stats')
    const data = await res.json()
    if (data.success) {
      stats.value = data
    }
  } catch (e) {
    console.error("Erreur API", e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div class="dashboard-wrapper">
    <header class="top-bar">
      <div class="user-info">
        <span class="grade">{{ user?.grade }}</span>
        <span class="name">{{ user?.name }}</span>
        <span class="matricule">#{{ user?.matricule }}</span>
      </div>

      <nav class="mdt-nav">
        <button @click="switchTab('home')" :class="{ active: currentTab === 'home' }">🏠 ACCUEIL</button>
        <button @click="switchTab('search')" :class="{ active: currentTab === 'search' }">🔍 FICHIERS</button>
        <button @click="switchTab('reports')" :class="{ active: currentTab === 'reports' }">📝 RAPPORTS</button>
        <button @click="switchTab('docs')" :class="{ active: currentTab === 'docs' }">📚 MANUELS</button>
      </nav>

      <button @click="$emit('logout')" class="logout-btn" title="Déconnexion">❌</button>
    </header>

    <main class="content-area">

      <div v-if="currentTab === 'home'" class="tab-content grid-container">
        <div class="panel danger-panel">
          <h3>🚨 AVIS DE RECHERCHE ACTIFS</h3>
          <div v-if="loading" class="loading-text">Chargement...</div>
          <ul v-else class="list-items">
            <li v-for="warrant in stats.warrants" :key="warrant.id">
              <strong>{{ warrant.target_name }}</strong>
              <p>{{ warrant.reason }}</p>
            </li>
            <li v-if="stats.warrants.length === 0">Aucun avis de recherche.</li>
          </ul>
        </div>

        <div class="panel info-panel">
          <h3>📄 DERNIERS RAPPORTS</h3>
          <div v-if="loading" class="loading-text">Chargement...</div>
          <ul v-else class="list-items">
            <li v-for="report in stats.reports" :key="report.id">
              <div class="report-header">
                <strong>{{ report.offender_name }}</strong>
                <span class="tag">{{ report.jail_time }} mois</span>
              </div>
              <p class="sub-text">Par: {{ report.officer_name }} - {{ report.title }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="currentTab === 'search'" class="tab-content">
        <MdtSearch />
      </div>

      <div v-if="currentTab === 'reports'" class="tab-content construction">
        <h3>Module de rédaction en développement...</h3>
      </div>

      <div v-if="currentTab === 'docs'" class="tab-content">
        <div class="docs-grid">
          <a href="/Liste/sop" target="_blank" class="doc-card">
            <span class="icon">📘</span>
            <h3>S.O.P</h3>
            <p>Procédures Standards</p>
          </a>
          <a href="/Liste/arrestation" target="_blank" class="doc-card">
            <span class="icon">👮</span>
            <h3>ARRESTATION</h3>
            <p>Guide & Miranda</p>
          </a>
          <a href="/Liste/proces" target="_blank" class="doc-card">
            <span class="icon">⚖️</span>
            <h3>JUSTICE</h3>
            <p>Procès & Lois</p>
          </a>
          <a href="/Liste/contact-doj" target="_blank" class="doc-card">
            <span class="icon">📩</span>
            <h3>DOJ</h3>
            <p>Contacter le Parquet</p>
          </a>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* (Gardez votre style précédent, et ajoutez ceci à la fin pour les cartes Doc) */
.dashboard-wrapper { color: #fff; font-family: 'Montserrat', sans-serif; animation: fadeIn 0.5s ease; }
.top-bar { display: flex; justify-content: space-between; align-items: center; background: rgba(5, 16, 32, 0.95); padding: 10px 20px; border-bottom: 2px solid var(--vp-c-brand); margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
.user-info { display: flex; flex-direction: column; }
.grade { font-size: 0.8rem; color: #aaa; text-transform: uppercase; }
.name { font-weight: bold; color: var(--vp-c-brand); font-family: 'Oswald', sans-serif; font-size: 1.1rem; }
.mdt-nav { display: flex; gap: 5px; }
.mdt-nav button { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #888; padding: 10px 20px; cursor: pointer; font-family: 'Oswald', sans-serif; text-transform: uppercase; font-weight: bold; transition: 0.2s; }
.mdt-nav button:hover { background: rgba(255,255,255,0.05); color: #fff; }
.mdt-nav button.active { background: var(--vp-c-brand); color: #000; border-color: var(--vp-c-brand); box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
.logout-btn { background: #c0392b; border: none; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
.grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.panel { background: rgba(10, 25, 47, 0.6); border: 1px solid #333; padding: 20px; }
.danger-panel { border-top: 4px solid #e74c3c; }
.info-panel { border-top: 4px solid #3498db; }
h3 { margin-top: 0; font-family: 'Oswald', sans-serif; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
.list-items { list-style: none; padding: 0; }
.list-items li { padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.construction { text-align: center; padding: 50px; border: 2px dashed #444; color: #666; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

/* Styles pour les cartes de documentation */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
.doc-card {
  background: rgba(30, 40, 60, 0.8);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  transition: transform 0.2s, background 0.2s;
  border-radius: 8px;
}
.doc-card:hover {
  background: rgba(50, 60, 80, 0.9);
  transform: translateY(-5px);
  border-color: var(--vp-c-brand);
}
.doc-card .icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 10px;
}
.doc-card h3 {
  color: var(--vp-c-brand);
  border: none;
  margin: 0;
}
.doc-card p {
  font-size: 0.9rem;
  color: #aaa;
  margin: 5px 0 0 0;
}

@media (max-width: 768px) {
  .grid-container { grid-template-columns: 1fr; }
  .mdt-nav button { padding: 8px 10px; font-size: 0.7rem; }
  .top-bar { flex-direction: column; gap: 10px; }
}
</style>