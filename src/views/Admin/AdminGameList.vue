<template>
  <AdminNavBarSide></AdminNavBarSide>
  <section>
    <div>
      <div class="admin-games-header">
        <RouterLink to="/admin/games">Retour</RouterLink>
        <div class="admin-games-title">
          <img src="../../assets/svg/games.svg" alt="Jeux">
          <h1>JEUX</h1>
        </div>
      </div>
      <h2>LISTE DES JEUX</h2>
      <div class="mobile-table-container">
        <table class="mobile-table">
          <tr>
            <th>Titre</th>
            <th>Genre</th>
            <th></th>
          </tr>
          <tr v-for="game in Games" :key="game.title">
            <td>{{ game.title }}</td>
            <td>{{ game.genre.name }}</td>
            <td class="td-img">
              <RouterLink :to="'/admin/editgame/' + formatTitleToUrl(game.title)" title="Modifier"><img
                  src="../../assets/svg/modify-pen.svg" alt="Modifier">
              </RouterLink>
            </td>
          </tr>
        </table>
      </div>
      <table class="desktop-table">
        <tr>
          <th>Titre</th>
          <th>Genre</th>
          <th>Date de sortie</th>
          <th>Plateforme</th>
          <th>Développeur</th>
          <th>Prix</th>
          <th>Rating</th>
          <th></th>
        </tr>
        <tr v-for="game in Games" :key="game.title">
          <td>{{ game.title }}</td>
          <td>{{ game.genre.name }}</td>
          <td>{{ formatDate(game.release_date) }}</td>
          <td>{{ game.platform }}</td>
          <td>{{ game.developer }}</td>
          <td>{{ formatPrice(game.price) }}</td>
          <td class="td-img"><img id="rating-img" :src="game.rating" alt="pegi"></td>
          <td class="td-img">
            <RouterLink :to="'/admin/editgame/' + formatTitleToUrl(game.title)" title="Modifier"><img
                src="../../assets/svg/modify-pen.svg" alt="Modifier">
            </RouterLink>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import AdminNavBarSide from '../../components/Admin/AdminNavBarSide.vue';
import { ref } from 'vue';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const formatDate = (dateSortie: string) => {
  const date = new Date(dateSortie);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
}

const Games = ref<any>([]);
axios.get(`${apiBaseUrl}/api/get/`, {
  headers: { 'Access-Control-Allow-Origin': 'https://videogame-web-app.vercel.app' }
})
  .then((response) => {
    Games.value = response.data;
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  })

function formatTitleToUrl(title: string) {
  let formattedTitle = title.toLowerCase();
  formattedTitle = formattedTitle.replace(/\s+/g, '-');
  formattedTitle = formattedTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return formattedTitle;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color-secondary);
  padding: 0 1em;
  padding-bottom: 4em;
}

.admin-games-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
  padding: 2em 0 1em;

  a {
    margin-right: 5em;
    color: var(--text-color-secondary);
    background-color: rgb(234, 149, 74);
    border-radius: var(--border-radius);
    color: var(--text-color-secondary);
    padding: 5px 15px;

    &:hover {
      background-color: #e26f03;
    }
  }

  .admin-games-title {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  img {
    height: 70px;
  }
}

table tr>th {
  position: sticky;
  top: 0;
  z-index: 3;
}

th,
td {
  border: 1px solid rgb(229, 229, 229);
  padding: 5px;
}

table th {
  background-color: #F2C8ED;
  color: var(--text-color-primary);
}

table tr:nth-child(odd) {
  background-color: rgba(23, 24, 33, 0.93);
}

table tr:nth-child(even) {
  background-color: rgba(51, 53, 75, 0.93);
}

table tr:hover {
  background-color: rgba(226, 111, 3, 0.85);
}

.td-img {
  text-align: center;

  img {
    vertical-align: middle;
    width: 23px;
  }

  #rating-img {
    width: 30px;
    height: auto;
  }

  &:has(a):hover {
    background-color: #e26f03;
  }

}

.desktop-table {
  display: none;
}

.mobile-table-container {
  height: 500px;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .desktop-table {
    display: block;
    height: 670px;
    overflow-y: auto;
    /* display: table-row; */
  }

  .mobile-table-container {
    display: none;
  }
}
</style>
