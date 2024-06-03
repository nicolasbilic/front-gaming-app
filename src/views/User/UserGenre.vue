<template>
  <div class="genre-page-container" v-if="!isLoading">
    <section class="genre-header genre-page" :style="{ backgroundImage: `url(${genre.images[0]})` }">
      <h1>JEUX {{ capitalize(genre.name) }}</h1>
    </section>
    <section class="genre-content" style="background-color: #fdfdfd;">
      <p>{{ genre.description }}</p>
      <div class="genre-container genre-page">
        <div class="genre-grid">
          <div class="genre-block" v-for="game in paginatedGames" :key="game.title">
            <RouterLink :to="'/games/' + formatTitleToUrl(game.title)" :title="game.title">
              <img :src="game.img" :alt="game.title">
              <span>{{ game.title }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="mt-auto-custom">
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
          <span>{{ currentPage }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
        </div>
        <UserSocials />
        <UserFooter />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import UserSocials from '../../components/User/UserSocials.vue'
import UserFooter from '../../components/User/UserFooter.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const isLoading = ref(true);
const Games = ref<any[]>([]); // crée une référence réactive Games qui est initialement un tableau vide. Cette référence sera utilisée pour stocker les données des jeux récupérées à partir de l'API.
const genre = ref<{ name: string; description: string; images: string[] }>({ name: '', description: '', images: [] }); // crée une référence réactive genre avec une structure { name: string }. Initialement, genre est un objet avec une propriété name vide. Je déclare le name ici car sinon l'affichage de genre.name est nesté dans onMounted donc encore invisible quand le navigateur parcourt le h1
const route = useRoute();
const itemsPerPage = 9; // pagination variables
const currentPage = ref(1);

// utilise computed pour accéder à la couleur de manière sécurisée
const genreColor = computed(() => {
  return genre.value.images.length > 1 ? genre.value.images[1] : '#ffffff';
});

function preloadImages(images: string[]) {
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
    img.onload = () => console.log(`Image loaded: ${image}`);
    img.onerror = () => console.log(`Failed to load image: ${image}`);
  });
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

onMounted(async () => { // récupère tous les jeux du genre (/ex horreur) de la page
  genre.value.name = route.params.genreName as string;
  try {
    const response = await axios.get(`${apiBaseUrl}/api/get/${genre.value.name}`);
    genre.value.description = response.data[0].genre.description as string;
    genre.value.images = response.data[0].genre.images as string[];

    Games.value = response.data;
    const headerBgImg = genre.value.images[0];
    const bodyBgImg = genre.value.images[1];
    const gameImgs = Games.value.map((game: any) => game.img);
    preloadImages([headerBgImg, bodyBgImg, ...gameImgs]);

    isLoading.value = false;

  } catch (error) {
    console.error('Front: Erreur lors de la récupération des données:', error);
  }
});

const totalPages = computed(() => Math.ceil(Games.value.length / itemsPerPage)); // nb total de jeux / jeux par page arrondi à l'entier supérieur = totalPages

const paginatedGames = computed(() => { //sous-ensemble de jeux à afficher sur la page actuelle
  const startIndex = (currentPage.value - 1) * itemsPerPage; // quand la page actuelle est la 2ème : startIndex = (2 - 1) * 9 = 9: le nouvel index de départ pour la deuxième page est 9
  const endIndex = startIndex + itemsPerPage; // endIndex = 9 + 9 = 18 le nouvel index de fin pour la deuxième page est 18
  return Games.value.slice(startIndex, endIndex); // retourne seulement les jeux pour la page actuelle
});

const prevPage = () => { // décrémente le numéro de page actuelle s'il est supérieur à 1
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  goToTop();
};

const nextPage = () => { // incrémente le numéro de page actuelle s'il est inférieur au nombre total de pages
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  goToTop();
};

const goToTop = () => {
  window.scrollTo(0, 0); // place la page en haut
};

const capitalize = (m: string) => { // const capitalize = (m: string) => m ? m.toUpperCase() : '';
  if (m) {
    return m.toUpperCase();
  }
  return '';
}

function formatTitleToUrl(title: any) {
  let formattedTitle = title.toLowerCase(); // convert title to lowercase
  formattedTitle = formattedTitle.replace(/\s+/g, '-'); // replace spaces with dashes
  formattedTitle = formattedTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents // normalize("NFD") décompose les caractères accentués en leurs formes de base suivies des diacritiques : "é" devient "e" + "́" (U+0301); l'expression régulière [\u0300-\u036f] trouve tous les diacritiques dans la chaîne normalisée.
  return formattedTitle;
}

</script>
<style src="../../style/genre.css"></style>