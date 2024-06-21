<template>
  <header>
    <nav>
      <!--- NavMenu Mobile --->
      <div class="sidenav" ref="navMenu" :style="{ left: isNavOpen ? '0' : '-250px' }"> <!-- Burger Menu -->
        <div id="closeBtn"> <!-- Close BM -->
          <img @click="closeNav" src="../../assets/svg/x-mark.svg" title="Fermer le menu" alt="Fermer le menu">
        </div>
        <ul> <!-- Links BM -->
          <li v-for="link in navLinks" :key="link.url">
            <RouterLink :active-class="active" :to="link.url" :title="link.title" @click="closeNav">{{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <a id="openBtn" @click="toggleNav" :style="{ display: is1100Screen ? 'flex' : 'none' }"> <!-- BM Icon -->
        <img src="../../assets/svg/hamburger.svg" title="Ouvrir le menu" alt="Ouvrir le menu">
      </a>
      <RouterLink class="brand" to="/" title="Accueil Ludus Studios"
        :style="{ marginLeft: is1100Screen ? '' : '50px' }">
        <img height="13" width="141" src="../../assets/svg/brand-logo.svg" alt="Marque Ludus Studios">
      </RouterLink>
      <ul> <!-- NavLinks -->
        <li v-for="link in navLinks" key="navLinks.url" :style="{ display: is1100Screen ? 'none' : 'block' }">
          <RouterLink :active-class="active" :to="link.url" :title="link.title">{{ link.label }}</RouterLink>
        </li>
      </ul>
      <!-- <RouterLink class="admin" to="/admin/login" title="Panel Admin">
        <img src="@/assets/svg/user-square.svg" alt="User">Admin
      </RouterLink> -->
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useMediaQuery } from '@vueuse/core';

const isNavOpen = ref(false); // Initialize BM with false value (it's closed) - Make it reactive with ref function
const toggleNav = () => { // Switch between opening and closing BM - Current value becomes its inverse value
  isNavOpen.value = !isNavOpen.value;
};
const closeNav = () => {
  isNavOpen.value = false;
};

const navMenu = ref();
onClickOutside(navMenu, closeNav) // Click outside the BM and the menu closes

const navLinks = ref([
  { url: "/", label: "ACCUEIL", title: "Accueil" },
  { url: "/games/library", label: "JEUX", title: "Jeux" }
  // { url: "/stories", label: "ACTUALITÉS", title: "Actualités" },
  // { url: "/visits", label: "VISITES", title: "Visites" },
  // { url: "/hire", label: "RECRUTEMENT", title: "Recrutement" }
  // { url: "/contact", label: "CONTACT", title: "Contact" }
])

const active = ref('active'); // Make active class reactive

const is1100Screen = useMediaQuery('(max-width: 1100px)')
const is576Screen = useMediaQuery('(max-width: 576px)')
</script>

<style scoped>
nav {
  display: flex;
  min-height: 40px;
  align-items: center;
  background-color: #F8F8F8;
  padding: 10px 0;

  .sidenav {
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    background-color: #e8e8e8;
    padding-top: 40px;
    transition: left 0.4s ease;

    #closeBtn {
      display: flex;
      height: 27px;

      img {
        margin: 2px 20px 2px auto;
        cursor: pointer;

        &:hover {
          border: 2px solid var(--color-horror-primary);
          border-radius: 50%;
        }
      }
    }

    a {
      padding: 5px 0px 5px 10px;
      font-size: 18px;
      display: block;

      &:hover {
        color: var(--text-color-secondary);
        background-color: #740101;
      }
    }

    .active {
      color: var(--text-color-secondary);
      background-color: var(--color-horror-primary);
    }

  }

  #openBtn {
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img:hover {
      outline: 2px solid var(--color-horror-primary);
      border-radius: 4px;
    }
  }

  .brand {
    margin-left: 10px;
    display: flex;
    align-items: center;

    @media (width > 576px) {
      img {
        width: 250px;
        height: 24px;
      }
    }
  }
}

.admin {
  display: flex;
  margin: 10px 20px 10px auto;
  background-color: #FEA14C;
  font-weight: 600;
  padding: 5px 15px;
  font-size: 16px;
  color: var(--text-color-secondary);
  border-radius: var(--border-radius);

  &:hover {
    background-color: #e26f03;
  }

  img {
    padding-right: 10px;
  }
}

nav>ul {
  display: flex;
  justify-content: flex-start;
  padding-left: 50px;
  gap: 2rem;
  flex-grow: 1;

  li {
    font-size: 18px;

    a:hover {
      color: var(--color-horror-primary);
    }

    .active {
      border-bottom: 2px solid var(--color-horror-primary);
    }
  }
}
</style>