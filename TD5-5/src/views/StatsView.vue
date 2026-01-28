<script setup>
import { ref, onMounted } from 'vue';

const scores = ref([]);

onMounted(() => {
  const data = localStorage.getItem('mastermind_scores');
  if (data) {
    scores.value = JSON.parse(data);
  }
});

const clearStats = () => {
  if(confirm("Voulez-vous vraiment effacer l'historique ?")) {
    localStorage.removeItem('mastermind_scores');
    scores.value = [];
  }
}
</script>

<template>
  <div class="stats-container">
    <h1>Tableau des Scores</h1>

    <div class="actions">
      <router-link to="/home" class="btn-home">Retour à l'accueil</router-link>
      <button v-if="scores.length" @click="clearStats" class="btn-clear">Effacer l'historique</button>
    </div>

    <div v-if="scores.length === 0" class="empty-state">
      <p>Aucune partie jouée pour le moment.</p>
    </div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>Joueur</th>
          <th>Résultat</th>
          <th>Code à trouver</th>
          <th>Détails (Échec)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="score in scores" :key="score.id" :class="score.result">
          <td>{{ score.date }}</td>
          <td class="pseudo">{{ score.pseudo }}</td>
          <td>
            <span class="badge" :class="score.result">{{ score.result.toUpperCase() }}</span>
          </td>
          <td>
            <span class="code-secret">{{ score.code.join('') }}</span>
          </td>
          <td class="details-cell">
            <div v-if="score.result === 'perdu' && score.lastAttempt" class="fail-details">
              <div>Dernier essai : <strong>{{ score.lastAttempt.proposal.join('') }}</strong></div>
              <div class="stats-mini">
                <span class="green">Corrects: {{ score.lastAttempt.wellPlaced }}</span> |
                <span class="orange">Mal placés: {{ score.lastAttempt.malPlaced }}</span>
              </div>
            </div>
            <span v-else class="success-icon">🏆</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

h1 { text-align: center; color: #2c3e50; }

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn-home, .btn-clear {
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-home { background-color: #2c3e50; color: white; }
.btn-clear { background-color: #c0392b; color: white; }

.table-wrapper { overflow-x: auto; }

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th { background-color: #f8f9fa; color: #2c3e50; }

.pseudo { font-weight: bold; color: #2980b9; }

.code-secret {
  font-family: monospace;
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 2px;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
}
.badge.gagné { background-color: #27ae60; }
.badge.perdu { background-color: #e74c3c; }

/* Style des lignes */
tr.gagné { background-color: #f0fff4; }
tr.perdu { background-color: #fff5f5; }

.fail-details { font-size: 0.85rem; }
.stats-mini { margin-top: 2px; color: #555; }
.green { color: #27ae60; font-weight: bold; }
.orange { color: #d35400; font-weight: bold; }
.success-icon { font-size: 1.5rem; }

.empty-state { text-align: center; padding: 40px; color: #7f8c8d; }
</style>