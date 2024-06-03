<template>
  <AdminNavBarSide />
  <section>
    <div class="kpi">
      <div class="kpi-block-first">
        <p>{{ Games.length }} jeux</p>
        <img src="../../assets/svg/sales.svg" alt="Ventes">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AdminNavBarSide from '../../components/Admin/AdminNavBarSide.vue';
import axios from 'axios';
import { ref } from 'vue';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Games = ref([]);
axios.get(`${apiBaseUrl}/api/get/`)
  .then((response) => {
    Games.value = response.data;
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  })
</script>

<style scoped>
.kpi {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5em;
}

.kpi-block-first {
  background-color: rgba(23, 24, 33, .93);
  color: var(--text-color-secondary);
  border-radius: var(--border-radius);
  width: 350px;
  min-height: 320px;
  padding: 1em 2em 1em 3em;

  :is(p:nth-child(1)) {
    text-align: right;
  }

  img {
    height: 80px;
  }
}
</style>