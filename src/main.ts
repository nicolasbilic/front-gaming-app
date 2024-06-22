import './style/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import axios from 'axios';
import App from '@/App.vue'
import UserHomepage from './views/User/UserHomepage.vue'
import UserLibrary from './views/User/UserLibrary.vue'
import UserGame from './views/User/UserGame.vue'
import UserGenre from './views/User/UserGenre.vue'
import UserStories from './views/UserStories.vue'
import UserStory from './views/UserStory.vue'
import UserContact from './views/UserContact.vue'
import AdminLogin from './views/Admin/AdminLogin.vue'
import AdminSignUp from './views/Admin/AdminSignUp.vue'
import AdminCreateNews from './views/Admin/AdminCreateNews.vue'
import AdminDashboard from './views/Admin/AdminDashboard.vue'
import AdminGames from './views/Admin/AdminGames.vue'
import AdminGameAdd from './views/Admin/AdminGameAdd.vue'
import AdminGameEdit from './views/Admin/AdminGameEdit.vue'
import AdminGameList from './views/Admin/AdminGameList.vue'
import NotFound from '@/components/NotFound.vue'

interface Meta extends RouteMeta {
  title?: string;
  description?: string;
}

function checkAuthentication() { // vérifie l'authentification
  const token = localStorage.getItem('authToken');
  return !!token;
}

const routes = [
  { path: '/', component: UserHomepage, meta: { title: 'Page d\'accueil Ludus Studios - Site Officiel LS', description: 'Site Officiel LS. Tous les meilleurs jeux-vidéo du moment.' } as Meta },
  { path: '/games/library', component: UserLibrary, meta: { title: 'Bibliothèque de jeux - Site Officiel LS', description: 'Site Officiel LS. Tous les meilleurs jeux-vidéo du moment.' } as Meta },
  { path: '/games/:gameTitle', component: UserGame, meta: { title: 'Page de jeu individuel', description: 'description jeu' } as Meta },
  { path: '/games/library/:genreName', component: UserGenre, meta: { title: 'Page de genre', description: 'description genre' } as Meta },
  { path: '/stories', component: UserStories },
  { path: '/story', component: UserStory },
  { path: '/contact', component: UserContact },
  { path: '/admin/login', component: AdminLogin },
  { path: '/admin/signup', component: AdminSignUp },
  { path: '/admin/news/create', component: AdminCreateNews, meta: { requiresAuth: true } },
  { path: '/admin/dashboard', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/admin/games', component: AdminGames, meta: { requiresAuth: true } },
  { path: '/admin/addgame', component: AdminGameAdd, meta: { requiresAuth: true } },
  { path: '/admin/editgame/:gameTitle', component: AdminGameEdit, meta: { requiresAuth: true } },
  { path: '/admin/listgames', component: AdminGameList, meta: { requiresAuth: true } },
  { path: '/404', component: NotFound, meta: { title: 'Page non trouvée - Site Officiel LS', description: 'La page que vous recherchez n\'existe pas.' } as Meta },
  { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
})

const apiBaseUrl = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_BASE_URL_DEV
  : import.meta.env.VITE_API_BASE_URL;

// guarde de navigation
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = checkAuthentication();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/admin/login');
    } else {
      next();
    }
  } else {
    next();
  }

  const meta = to.meta as Meta;

  if (to.path.includes('/games/') && to.params.gameTitle) {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/get/title/${to.params.gameTitle}`);
      const gameData = response.data;

      if (gameData) {
        document.title = gameData.title || meta.title || 'Ludus Studios';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', gameData.description || meta.description || 'Tous les meilleurs jeux-vidéo du moment.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du jeu:', error);
      document.title = meta.title ?? 'Ludus Studios';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', meta.description ?? 'Tous les meilleurs jeux-vidéo du moment.');
      }
    }
  } else if (to.path.includes('/games/library/') && to.params.genreName) {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/get/genre/${to.params.genreName}`);
      const genreData = response.data;

      if (genreData) {
        document.title = genreData.name || meta.title || 'Ludus Studios';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', genreData.description || meta.description || 'Tous les meilleurs jeux-vidéo du moment.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du genre:', error);
      document.title = meta.title ?? 'Ludus Studios';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', meta.description ?? 'Tous les meilleurs jeux-vidéo du moment.');
      }
    }
  } else {
    document.title = meta.title ?? 'Ludus Studios';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description ?? 'Tous les meilleurs jeux-vidéo du moment.');
    }
  }
});

createApp(App)
  .use(router)
  .mount('#app')