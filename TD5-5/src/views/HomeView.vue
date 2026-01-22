<script setup>
import { inject, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGame } from '../services/game';

const pseudo = inject('pseudo');
const router = useRouter();

const { code, generateCode } = useGame();
let intervalId;

onMounted(() => {
  generateCode();
  intervalId = setInterval(() => {
    generateCode();
  }, 2000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const lancerJeu = () => {
  if (pseudo.value && pseudo.value.trim()) {
    router.push('/game');
  }
};
</script>

<template>
  <div class="home-container">
    <header class="game-header">
      <h1>Code Breaker</h1>
      <div class="code-animation" v-if="code.length">
        <span v-for="(digit, index) in code" :key="index" class="digit-box">
          {{ digit }}
        </span>
      </div>
    </header>

    <div class="rules">
      <h2>Règles du jeu</h2>
      <ul>
        <li>Devinez le code à 4 chiffres uniques.</li>
        <li>Vous avez 10 tentatives.</li>
        <li>Le système vous indiquera les chiffres bien placés et mal placés.</li>
      </ul>
    </div>

    <div class="input-group">
      <label for="pseudo">Votre Pseudo :</label>
      <input id="pseudo" v-model="pseudo" type="text" placeholder="Entrez votre pseudo..." @keyup.enter="lancerJeu"/>
      <button @click="lancerJeu">Jouer</button>
    </div>
  </div>
</template>
