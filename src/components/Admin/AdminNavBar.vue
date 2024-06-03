<template>
  <header>
    <nav>
      <!--- NavMenu Mobile --->
      <div class="sidenav" ref="navMenu" :style="{ left: isNavOpen ? '0' : '-250px' }"> <!-- Burger Menu -->
        <div id="closeBtn"> <!-- Close BM -->
          <img @click="closeNav" src="@/assets/svg/x-mark.svg" title="Fermer le menu" alt="Fermer le menu">
        </div>
        <ul> <!-- Links BM -->
          <li v-for="link in navLinks" :key="link.url">
            <RouterLink :active-class="active" :to="link.url" :title="link.title" @click="closeNav">{{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <a id="openBtn" @click="toggleNav" :style="{ display: is750Screen ? 'flex' : 'none' }"> <!-- BM Icon -->
        <img src="@/assets/svg/hamburger-white.svg" title="Ouvrir le menu" alt="Ouvrir le menu">
      </a>
      <RouterLink class="brand" to="/" title="Accueil Ludus Studios" :style="{ marginLeft: is750Screen ? '' : '50px' }">
        <img src="@/assets/svg/brand-logo.svg" alt="Marque Ludus Studios"
          :style="{ width: is576Screen ? '141px' : '' }">
      </RouterLink>

      <!-- <RouterLink class="signup" v-if="!isAuthenticated" :style="{ display: is750Screen ? 'none' : 'flex' }"
        to="/admin/signup" title="S'enregistrer">
        S'enregistrer
      </RouterLink>
      <RouterLink class="login" v-if="!isAuthenticated" :style="{ display: is750Screen ? 'none' : 'flex' }"
        to="/admin/login" title="Se connecter">
        Se connecter
      </RouterLink>
      <button class="signout" v-if="isAuthenticated" @click="logout" title="Se déconnecter">
        Se déconnecter
      </button> -->
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // fournit l'objet route actuel qui accède aux infos sur l'url actuelle
import { onClickOutside } from '@vueuse/core';
import { useMediaQuery } from '@vueuse/core';

const is750Screen = useMediaQuery('(max-width: 750px)')
const is576Screen = useMediaQuery('(max-width: 576px)')

const route = useRoute(); // contient les infos sur l'url actuelle
const router = useRouter();
const isAuthenticated = ref(false);

watch(() => route.path, (newPath) => {
  isAuthenticated.value = !(newPath.includes('/login') || newPath.includes('/signup'));
});

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('adminId');
  isAuthenticated.value = false;
  router.push('/admin/login');
};

// if(newPath.includes('/admin') || isAuthenticated.value = false) {
//   router.push('/admin/login');
// }

const loginPage = ref(route.path.includes('/login'));

watch(() => route.path, (newPath) => {
  loginPage.value = newPath.includes('/login');
});

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
  { url: "/admin/login", label: "CONNEXION", title: "Connexion" },
  { url: "/admin/signup", label: "INSCRIPTION", title: "Inscription" }
])

const active = ref('active'); // Make active class reactive

</script>

<style scoped>
nav {
  display: flex;
  min-height: 40px;
  align-items: center;

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

  }

  .signup,
  .signout {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
    margin-left: auto;
    border: none;
  }

  .login,
  .signup,
  .signout {
    margin-right: 20px;
    display: flex;
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

  &>ul {
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
}
</style>