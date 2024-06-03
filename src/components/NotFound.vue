<template>
  <div>
    <div class="error-404">
      <h2>La page recherchée est introuvable</h2>
      <ActionButton link="/" title="RETOURNER AU SITE" label="RETOURNER AU SITE" />
    </div>
    <UserSocials />
    <UserFooter />
  </div>
</template>


<script setup lang="ts">
import ActionButton from './ActionButton.vue';
import UserSocials from './User/UserSocials.vue'
import UserFooter from './User/UserFooter.vue';

</script>

<style scoped>
.error-404 {
  background-image: url('../assets/jpg/404.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 80vh;
  color: var(--text-color-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1em;
}

a {
  border: 4px solid #F08C79;
  background-color: transparent;
  color: var(--text-color-secondary);
  border-radius: var(--border-radius);
  padding: 12px 32px;
  font-weight: bolder;
  font-size: 15px;

  &:hover,
  &:focus {
    box-shadow: 0 0.5em 0.5em -0.4em #ffa260;
    transform: translateY(-0.5em);
  }
}

h2 {
  padding-top: 3.5em;
}
</style>