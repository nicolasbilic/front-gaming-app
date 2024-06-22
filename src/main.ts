import './style/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
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

// guarde de navigation
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication(); // fonction pour vérifier l'authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) { // vérifie si la route nécessite une authentification
      next('/admin/login'); // redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    } else {
      next(); // poursuit la navigation
    }
  } else {
    next(); // si la route ne nécessite pas d'authentification, poursuit simplement la navigation
  }
  // Mettre à jour le titre
  const meta = to.meta as Meta;
  if (meta.title) {
    document.title = meta.title;
  }

  // Mettre à jour la description
  if (meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    }
  }
});

createApp(App)
  .use(router)
  .mount('#app')