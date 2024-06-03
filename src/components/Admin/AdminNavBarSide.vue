<template>

  <div class="navbar-side-container">
    <div class="navbar-side-links">
      <RouterLink :active-class="active" to="/admin/dashboard"><img src="../../assets/svg/home.svg" alt="Dashboard">
      </RouterLink>
      <RouterLink :active-class="active" to="/admin/games"><img src="../../assets/svg/controller.svg" alt="Jeux">
      </RouterLink>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const active = ref('active');
</script>

<style scoped>
.navbar-side-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;

  a:hover {
    transform: translateY(-4px);
  }

  .active {
    border-bottom: 3px solid rgb(214, 127, 13);
  }
}
</style>