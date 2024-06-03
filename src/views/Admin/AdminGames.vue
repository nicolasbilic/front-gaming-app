<template>
  <AdminNavBarSide></AdminNavBarSide>
  <section>
    <div>
      <RouterLink to="/admin/addgame">Ajouter jeu</RouterLink>
      <div class="admin-games-block">
        <RouterLink to="/admin/listgames">
          <div class="admin-games-category">
            <img src="../../assets/svg/games.svg" alt="Jeux">
            <h2>JEUX</h2>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AdminNavBarSide from '../../components/Admin/AdminNavBarSide.vue';
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3em 1em;
}

section>div>a {
  background-color: rgb(234, 149, 74);
  border-radius: var(--border-radius);
  color: var(--text-color-secondary);
  padding: 5px 15px;

  &:hover {
    background-color: #e26f03;
  }
}

.admin-games-block {
  padding-top: 1em;
}

.admin-games-category {
  background-color: rgba(23, 24, 33, .93);
  border-radius: var(--border-radius);
  color: var(--text-color-secondary);
  width: 350px;
  min-height: 320px;
  padding: 1em 2em 1em 3em;

  &:hover {
    background-color: rgba(23, 24, 33, 1);
    transition: 0.3s;
  }

  img {
    height: 80px;
  }

  h2 {
    font-size: 30px;
  }

}
</style>