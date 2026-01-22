<script setup>
import { inject, ref, onMounted } from 'vue';
import { useGame } from '../services/game';

const pseudo = inject('pseudo');

const { generateCode, validateAttempt, attempts, state } = useGame();

const userInput = ref("");

onMounted(() => {
  generateCode();
});

const submitAttempt = () => {
  const currentProposal = userInput.value.split('').map(Number);
  if (currentProposal.length !== 4 || currentProposal.some(isNaN)) {
    alert("Veuillez entrer exactement 4 chiffres.");
    return;
  }
  validateAttempt(currentProposal);
  userInput.value = "";
};
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
      <router-link to="/home" class="btn-restart">Rejouer</router-link>
    </div>

    <div v-else class="input-zone">
      <input v-model="userInput" type="text" maxlength="4" placeholder=". . . ." @keyup.enter="submitAttempt"/>
      <button @click="submitAttempt">Valider</button>
    </div>

    <div class="history">
      <h3>Historique</h3>
      <div v-if="attempts.length === 0" class="no-attempts">
        Aucune tentative pour le moment.
      </div>

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

.input-zone {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

input {
  font-size: 1.5rem;
  letter-spacing: 5px;
  padding: 5px;
  width: 100px;
  text-align: center;
}




.attempt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  margin-bottom: 5px;
  border-radius: 4px;
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
.game-over.gagné {
  background-color: #d4edda;
  color: #155724;
}

.game-over.perdu {
  color: #721c24;
}
</style>