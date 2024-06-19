<template>
  <div>
    <!-- Header Section -->
    <section class="header-section">
      <div class="header-section-content">
        <div>
          <h1>BEYOND</h1>
        </div>
        <p>Incarnez Stijo, un aventurier intrépide, et partez à la conquête d'une île légendaire, bondée de dangers et
          de mystères.
        </p>
        <!-- <ActionButton class="button button--action" link="/games/evasion-du-manoir" label="PRÉCOMMANDEZ"
          title="Précommandez" /> -->
        <ActionButton class="button button--action" link="games/library/plateforme" label="JEUX DE PLATEFORME"
          title="Plateforme" />
        <ActionButton class="button button--info" link="/games/beyond" label="VOIR LE JEU" title="Voir le jeu" />
      </div>
    </section>
    <!-- <section class="visit">
      <h2>Participez à une visite guidée des bureaux LUDUS STUDIOS</h2>
      <RouterLink to="/games" title="En Savoir plus">EN SAVOIR PLUS</RouterLink>
    </section> -->

    <!-- Featured Games -->
    <section class="featured-games">
      <h2>Jeux à l'affiche</h2>
      <div class="game-grid">
        <div class="game-box" v-for="game in Games" :key="game.title">
          <RouterLink :to="'/games/' + formatTitleToUrl(game.title)" :title="game.title">
            <img height="319" width="auto" :src="game.img" :alt="'Image du jeu' + game.title">
            <span>{{ game.title }}</span>
          </RouterLink>
        </div>
      </div>
      <RouterLink to="/games/library" class="button button--more" title="Jeux">Tous les jeux</RouterLink>
    </section>

    <!-- News Stories -->
    <!-- <section class="news-section">
      <h2>Dernières actualités</h2>
      <div class="news-tags">
        <span>Actus</span>
        <span>Sport</span>
        <span>Course</span>
        <span>Action</span>
        <span>RPG</span>
        <span>Horreur</span>
        <span>MMO</span>
      </div>
      <div class="news-grid">
        <div class="news-block" v-for="(story, index) in stories" :key="story.date"
          :style="{ display: HideStories(index) && is55Screen ? 'none' : 'block' }">
          <div class="news-header"></div>
          <div class="news-content">
            <span>Test Studios</span>
            <span>{{ story.date }}</span>
            <h3>{{ story.title }}</h3>
            <p>{{ story.desc }}</p>
          </div>
        </div>
      </div>
      <RouterLink to="/stories" class="button button--more" title="Infos">Lire la suite</RouterLink>
    </section> -->

    <!-- Newsletter -->
    <!-- <section class="newsletter-section">
      <div class="newsletter-content">
        <img src="../assets/png/newsletter-logo.png" alt="Newsletter">
        <p>Maximisez votre expérience de jeu avec des récompenses inédites et du contenu exclusif.</p>
        <form action="">
          <input type="text" class="button--info" placeholder="@  Entrez votre adresse email">
          <button type="submit" class="button button--more">S'abonner à la newsletter</button>
        </form>
      </div>
    </section> -->
    <UserSocials />
    <UserFooter />
  </div>
</template>

<script setup lang="ts">
import UserSocials from '../../components/User/UserSocials.vue'
import UserFooter from '../../components/User/UserFooter.vue';
import ActionButton from '../../components/ActionButton.vue';
import { useMediaQuery } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Games = ref<any[]>([]);
const isLoading = ref(true);

function preloadImages(images: string[]) { // fonction pour précharger les images
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
}

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiBaseUrl = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_BASE_URL_DEV
  : import.meta.env.VITE_API_BASE_URL;

onMounted(() => {
  axios.get(`${apiBaseUrl}/api/get/last6games`)
    .then((response) => {
      Games.value = response.data;
      const imageUrls = Games.value.map((game: any) => game.img); // appel de la fonction de préchargement des images
      preloadImages(imageUrls);
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
});

function formatTitleToUrl(title: any) {
  let formattedTitle = title.toLowerCase();
  formattedTitle = formattedTitle.replace(/\s+/g, '-');
  formattedTitle = formattedTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return formattedTitle;
}

const stories = ref([
  { date: '9 avr. 2024', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' }
])

// Afficher toutes les infos sauf les 4 dernières, la fonction HideNews prend le numéro de chaque info (son index) et vérifie si cet index est >= que le nombre total d'histoires moins 4
const HideStories = (index: any) => index >= stories.value.length - 4;

const is55Screen = useMediaQuery('(width <= 55em)');
</script>

<style src="../../style/homepage.css"></style>