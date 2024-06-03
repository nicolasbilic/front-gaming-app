<template>
  <div class="one-game-container" v-for="game in Games" :key="game.title" style="background-color: #ffffff"
    v-if="!isLoading">
    <section class="one-game-main-info" :style="{ display: use1100width ? 'grid' : 'flex' }">
      <!-- 1st Grid column -->
      <div class="one-game-grid">
        <div class="one-game-info">
          <h2> {{ game.title }}™ </h2>
          <div class="inside-links">
            <a href="#aboutGame" @click.prevent="scrollToSection('#aboutGame')" class="button">À propos du jeu</a>
            <a href="#description" @click.prevent="scrollToSection('#description')" class="button">Description</a>
            <a href="#features" @click.prevent="scrollToSection('#features')" class="button">Fonctionnalités</a>
          </div>
          <img class="responsive-img" :alt="game.title" :src="game.images[0]">
          <div :style="{ display: use1100width ? 'block' : 'none' }">
            <!-- <div class="screenshots">
              <p>Captures d'écran</p>
              <div class="arrows">
                <img src="../assets/svg/left-arrow.svg" alt="Left Arrow">
                <img src="../assets/svg/right-arrow.svg" alt="Right Arrow">
              </div>
            </div> -->
            <!-- <div class="screenshots-img">
              <img :alt="game.title" :src="game.images[1]">
              <img :alt="game.title" :src="game.images[2]">
              <img :alt="game.title" :src="game.images[3]">
            </div> -->
          </div>
          <img :src="game.rating" class="pegi" alt="PEGI">
          <div class="about-game">
            <h2 id="aboutGame">À propos du jeu</h2>
            <div class="about-game-content">
              <div>
                <p>Développeur</p>
                <p>Genre</p>
                <p>Plateforme</p>
                <p>Date de sortie</p>
                <p>Fonctionnalités</p>
              </div>
              <div>
                <p> {{ game.developer }}</p>
                <RouterLink :to="`/games/library/${game.genre.name}`">
                  <p>{{ game.genre.name }}</p>
                </RouterLink>
                <p>{{ game.platform }}</p>
                <p>{{ formatDate(game.release_date) }}</p>
                <a href="#features">
                  <p>Voir</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 2nd Grid column -->
      <div class="purchase-container" :style="{ display: use1100width ? 'block' : 'none' }">
        <div class="game-buy">
          <h3>{{ game.title }}™</h3>
          <p>Plateforme : {{ game.platform }}</p>
          <div class="pay">
            <p>{{ game.title }}™</p>
            <p>{{ formatPrice(game.price) }} €</p>
          </div>
        </div>
      </div>
    </section>
    <div class="one-game-side-info">
      <div class="essai">
        <details :style="{ display: use1100width ? 'none' : 'block' }">
          <summary>Description</summary>
          <p>{{ game.description }}</p>
        </details>
        <div id="description" class="desktop-description" :style="{ display: use1100width ? 'block' : 'none' }">
          <h2>Description</h2>
          <p>{{ game.description }}</p>
        </div>
        <h2 id="features">Fonctionnalités</h2>
        <ul>
          <li v-for="feature in game.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>
    </div>
    <UserSocials />
    <UserFooter />
  </div>
</template>

<script setup lang="ts">
import UserSocials from '../../components/User/UserSocials.vue'
import UserFooter from '../../components/User/UserFooter.vue';
import { useMediaQuery } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
const isLoading = ref(true);

const use1100width = useMediaQuery('(width > 1100px)');
const Games = ref<any[]>([]);
const game = ref<{ title: string; }>({
  title: '',
});
const route = useRoute();

// Utilise la variable d'environnement pour l'URL de l'API
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

onMounted(() => {
  game.value.title = route.params.gameTitle as string;
  axios.get(`${apiBaseUrl}/api/get/title/${game.value.title}`)
    .then((response) => {
      // game.value.title = response.data.title as string;
      Games.value = response.data;
      console.log(response.data);
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
});

const formatDate = (dateString: string) => { // convertit la date; la méthode formatDate prend une chaîne de caractères
  const date = new Date(dateString); // crée un nouvel objet Date à partir de la chaîne de caractères dateString
  const day = String(date.getDate()).padStart(2, '0'); // récupère le jour de la date, le convertit en chaîne de caractères et le formate pour qu'il ait toujours 2 chiffres
  const month = String(date.getMonth() + 1).padStart(2, '0'); // récupère le mois de la date, l'incrémente de 1 (car les mois sont indexés à partir de 0) et le formate pour qu'il ait toujours 2 chiffres
  const year = String(date.getFullYear()).slice(-2); // récupère l'année de la date et ne garde que les deux derniers chiffres
  return `${day}/${month}/${year}`; // retourne la date formatée sous la forme d'une chaîne de caractères au format JJ/MM/AA
};

const formatPrice = (price: number) => {
  return price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Scroll to section without adding to history
const scrollToSection = (id: string) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', id);
  }
};

</script>
<style src="../../style/game.css"></style>