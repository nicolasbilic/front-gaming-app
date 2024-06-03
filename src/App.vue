<template>
  <div :class="bgClass" v-if="AdminPage">
    <AdminNavBar />
    <RouterView />
    <AdminFooter />
  </div>
  <div v-if="!AdminPage">
    <UserNavBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import UserNavBar from './components/User/UserNavBar.vue'
import AdminNavBar from './components/Admin/AdminNavBar.vue'
import AdminFooter from './components/Admin/AdminFooter.vue';
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // fournit l'objet route actuel qui accède aux infos sur l'url actuelle

const route = useRoute(); // contient les infos sur l'url actuelle

const AdminPage = ref(route.path.includes('/admin'));
const bgImage = ref('./assets/jpg/admin-our-offices.jpg');

watch(() => route.path, (newPath) => { // watch surveille les changements d'états réactifs (de chemin de l'url ici) // le 1er argument de watch est une fonction qui renvoie la valeur à surveiller (route.path) // le 2ème argument est une fonction qui est appelée chaque fois que la valeur surveillée (route.path) change.
  AdminPage.value = newPath.includes('/admin');
  if (newPath.includes('/admin/editgame') || newPath.includes('/admin/addgame') || newPath.includes('/admin/listgames')) {
    bgImage.value = 'src/assets/jpg/modern-offices3.jpg';
  } else {
    bgImage.value = './assets/jpg/admin-our-offices.jpg';
  }
});

const bgClass = computed(() => ({
  'bg-image': true,
  'bg-admin-special': route.path.includes('/admin/editgame') || route.path.includes('/admin/addgame') || route.path.includes('/admin/listgames')
}));

</script>

<style scoped>
.bg-image {
  background-image: url('./assets/jpg/admin-offices.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;

}

.bg-image::before {
  content: url('./assets/jpg/admin-offices.webp');
  position: absolute;
  top: -9999rem;
  left: -9999rem;
  opacity: 0;
}

.bg-admin-special {
  background-image: url('./assets/jpg/admin-offices-lg.webp');
  background-size: auto 2300px;
  background-repeat: no-repeat;
  min-height: 100vh;

}

.bg-admin-special::before {
  content: url('./assets/jpg/admin-offices-lg.webp');
  position: absolute;
  top: -9999rem;
  left: -9999rem;
  opacity: 0;
}
</style>