<template>
  <footer>
    <div>
      <RouterLink class="brand" to="/" title="Accueil Ludus Studios" :style="{ marginLeft: is992Screen ? '' : '50px' }">
        <img height="auto" width="141" src="../../assets/svg/brand-logo.svg" alt="Marque Ludus Studios">
      </RouterLink>
      <ul :style="{ display: is1200Screen ? 'none' : 'flex' }">
        <li v-for="link in footerLinks" key="footerLinks.url">
          <RouterLink :to="link.url" :title="link.title">{{ link.label }}</RouterLink>
        </li>
        <li><a href="mailto:contact@ludusstudios.com">Contactez-nous</a></li>
      </ul>
      <p>©Ludus Studios</p>
    </div>
    <ul :style="{ display: is1200Screen ? 'flex' : 'none' }">
      <li v-for="link in footerLinks" key="footerLinks.url">
        <RouterLink :to="link.url" :title="link.title">{{ link.label }}</RouterLink>
      </li>
      <li><a href="mailto:contact@ludusstudios.com">Contactez-nous</a></li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';

const footerLinks = ref([
  { url: "/games/library", label: "Bibliothèque de jeux", title: "Bibliothèque de jeux" },
  // { url: "/visits", label: "Visites", title: "Visites" },
  // { url: "/contact", label: "Contact", title: "Contact" },
  // { url: "/hire", label: "Recrutement", title: "Recrutement" },
  // { url: "/legal", label: "Mentions légales", title: "Mentions légales" }
])

const is576Screen = useMediaQuery('(max-width: 576px)')
const is992Screen = useMediaQuery('(max-width: 992px)')
const is1200Screen = useMediaQuery('(max-width: 1200px)')
</script>

<style scoped>
footer {
  max-height: 200px;
  background-color: rgb(248, 248, 248);

  div {
    display: flex;
    align-items: center;
    padding: 20px 0;

    .brand {
      margin-left: 10px;
      display: flex;
      align-items: center;

      @media (width > 576px) {
        img {
          width: 250px;
        }
      }
    }

    p {
      margin-left: auto;
      padding: 0 20px;
    }
  }

  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 20px 0 50px;
    gap: 2rem;
    flex-grow: 1;

    li {
      font-size: 16px;

      a:hover {
        color: var(--color-horror-primary);
      }
    }
  }
}
</style>