<template>
  <div>
    <section class="games-header" id="library">
      <div class="games-content">
        <img src="../../assets/svg/brand-logo.svg" alt="Newsletter">
        <p>La plus grande collection de jeux-vidéos. Les meilleurs titres, tous les genres, d’hier et d’aujourd’hui.</p>
      </div>
    </section>
    <!-- <div class="game-tags">
      <a :href="tag.link" v-for="tag in tags" :key="tag.link"><span>{{ tag.title }}</span></a>
    </div> -->
    <!-- Genre section -->
    <section class="genre-section" id="genre">
      <h2>Genres</h2>
      <div class="genre-grid">
        <div class="genre-box" v-for="game in Games" :key="game.title">
          <RouterLink :to="'/games/library/' + game.genre.name" :title="game.genre.name">
            <img :src="game.genre.images[2]" :alt="game.genre.name">
            <span>{{ game.genre.name }}</span>
          </RouterLink>
        </div>
      </div>
    </section>
    <!-- Platform section -->
    <!-- <section class="platform-section" id="platform">
      <h2>Plateformes</h2>
      <div class="platform-container">
        <div class="platform-grid">
          <div class="platform-box" v-for="platform in platforms" :key="platform.link">
            <RouterLink :to="platform.link">
              <img :src="platform.img" :alt="platform.title">
              <span>{{ platform.title }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section> -->
    <!-- Age section -->
    <!-- <section class="age-section" id="rating">
      <h2>Classification d'âge</h2>
      <div class="age-grid">
        <div class="age-block" v-for="pegi in pegis" :key="pegi.link">
          <RouterLink :to="pegi.link">
            <img :src="pegi.img" :alt="pegi.title">
            <span>{{ pegi.title }}</span>
          </RouterLink>
        </div>
      </div>
    </section> -->
    <!-- Game modes section -->
    <!-- <section class="modes-section" id="gameMode">
      <h2>Modes de jeu</h2>
      <div class="mode-grid">
        <div class="mode-block" v-for="mode in modes" :key="mode.link">
          <RouterLink :to="mode.link">
            <img :src="mode.img" :alt="mode.title">
            <span>{{ mode.title }}</span>
          </RouterLink>
        </div>
      </div>
    </section> -->
    <UserSocials />
    <UserFooter />
  </div>
</template>

<script setup lang="ts">
import UserSocials from '../../components/User/UserSocials.vue'
import UserFooter from '../../components/User/UserFooter.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Games = ref<any[]>([]);
const isLoading = ref(true);

function preloadImages(images: string[]) { // fonction pour précharger les images
  images.forEach((image) => {
    const imgofGenre = new Image();
    imgofGenre.src = image;
  });
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

onMounted(() => {
  axios.get(`${apiBaseUrl}/api/get/genre`)
    .then((response) => {
      Games.value = response.data;
      const imageUrls = Games.value.map((game: any) => game.genre.images[2]); // appel de la fonction de préchargement des images
      preloadImages(imageUrls);
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
});

// const tags = ref([
//   { title: 'Bibliothèque', link: '#library' },
//   { title: 'Genres', link: '#genre' },
//   { title: 'Plateformes', link: '#platform' },
//   { title: 'Classification d\'âge', link: '#rating' },
//   { title: 'Modes de jeu', link: '#gameMode' },
// ])

// const platforms = ref([
//   { link: '/platform/lsplay', img: '/src/assets/svg/platform-ls-play.svg', title: 'LS Play' },
//   { link: '/platform/playstation', img: '/src/assets/svg/platform-playstation.svg', title: 'Playstation' },
//   { link: '/platform/pc', img: '/src/assets/svg/platform-pc.svg', title: 'Téléchargement PC' },
//   { link: '/platform/nintendo', img: '/src/assets/svg/platform-nintendo.svg', title: 'Nintendo Switch' },
//   { link: '/platform/mobile', img: '/src/assets/svg/platform-mobile.svg', title: 'Mobile' },
//   { link: '/platform/mac', img: '/src/assets/svg/platform-mac.svg', title: 'Téléchargement Mac' },
//   { link: '/platform/xbox', img: '/src/assets/svg/platform-xbox.svg', title: 'Xbox' }
// ])

// const pegis = ref([
//   { link: '/filter/pegi-3', img: '/src/assets/jpg/pegi3.jpg', title: 'PEGI 3' },
//   { link: '/filter/pegi-7', img: '/src/assets/jpg/pegi7.jpg', title: 'PEGI 7' },
//   { link: '/filter/pegi-12', img: '/src/assets/jpg/pegi12.jpg', title: 'PEGI 12' },
//   { link: '/filter/pegi-16', img: '/src/assets/jpg/pegi16.jpg', title: 'PEGI 16' },
//   { link: '/filter/pegi-18', img: '/src/assets/jpg/pegi18.jpg', title: 'PEGI 18' }
// ])

// const modes = ref([
//   { link: '/mode/freetoplay', img: '/src/assets/jpg/free.jpg', title: 'Gratuit' },
//   { link: '/mode/multiplayer', img: '/src/assets/jpg/multiplayer.jpg', title: 'Multijoueur' },
//   { link: '/mode/solo', img: '/src/assets/jpg/solo.jpg', title: 'Solo' }
// ])

</script>
<style src="../../style/games.css"></style>