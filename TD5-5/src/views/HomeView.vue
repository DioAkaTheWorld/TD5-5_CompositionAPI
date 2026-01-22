<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const pseudo = inject('pseudo');
const router = useRouter();

const lancerJeu = () => {
  if (pseudo.value.trim()) {
    router.push('/game');
  }
};
</script>

<template>
  <div class="home-container">
    <h1>Code Breaker</h1>
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
      <input id="pseudo" v-model="pseudo" type="text" placeholder="Entrez votre pseudo..." />
      <button @click="lancerJeu">JOUER</button>
    </div>
  </div>
</template>
