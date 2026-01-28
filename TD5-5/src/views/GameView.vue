<script setup>
import { inject, ref, onMounted } from 'vue';
import { useGame } from '../services/game';
import CodeField from '../components/CodeField.vue';

const pseudo = inject('pseudo');

const { generateCode, validateAttempt, attempts, state } = useGame();

const currentProposal = ref(Array(4).fill(null));

onMounted(() => {
  generateCode();
});

const submitAttempt = () => {
  if (currentProposal.value.some(val => val === null || val === '')) {
    alert("Veuillez entrer exactement 4 chiffres.");
    return;
  }
  validateAttempt([...currentProposal.value]);
  currentProposal.value = Array(4).fill(null);
};

const restartGame = () => {
  generateCode();
  currentProposal.value = Array(4).fill(null);
}
</script>

<template>
  <div class="game-container">
    <div class="header-info">
      <h1>À toi de jouer, {{ pseudo }} !</h1>
      <p>Essais restants : {{ 10 - attempts.length }}</p>
    </div>

    <div v-if="state !== 'en cours'" class="game-over" :class="state">
      <h2 v-if="state === 'gagné'">Bravo {{ pseudo }} !</h2>
      <h2 v-else>Dommage {{ pseudo }}, c'est perdu</h2>

      <button @click="restartGame" class="btn-restart">Rejouer</button>
      <br><br>
      <router-link class="btn-stats" to="/stats">Voir les stats</router-link>
    </div>

    <div v-else class="input-zone">
      <CodeField
          :length="4"
          v-model="currentProposal"
          @validate="submitAttempt"
      />
    </div>

    <div class="history">
      <h3>Historique</h3>
      <div v-if="attempts.length === 0" class="no-attempts">
        Aucune tentative pour le moment.
      </div>

      <TransitionGroup name="list" tag="div" class="history-list">
        <div v-for="(attempt, index) in attempts" :key="index" class="attempt-row">
          <span class="attempt-number">#{{ index + 1 }}</span>
          <div class="code-display">
            <span v-for="digit in attempt.proposal" :key="digit" class="digit">{{ digit }}</span>
          </div>
          <div class="feedback">
            <span class="well-placed">Bien placés : {{ attempt.wellPlaced }}</span>
            <span class="mal-placed">Mal placés : {{ attempt.malPlaced }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.btn-stats {
   padding: 10px 20px;
   background-color: #2c3e50;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   font-size: 1rem;
 }

.input-zone {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.attempt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  margin-bottom: 5px;
  border-radius: 4px;
  /* Ombre légère pour mieux voir les cartes */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.code-display {
  display: flex;
  gap: 5px;
}

.digit {
  font-weight: bold;
  font-size: 1.2rem;
  background: #eee;
  padding: 2px 8px;
  border-radius: 4px;
}

.feedback {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  text-align: right;
}

.game-over {
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.btn-restart {
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.history-list {
  display: flex;
  flex-direction: column-reverse;
  gap: 5px;
}

</style>