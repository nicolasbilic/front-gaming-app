<template>
  <AdminNavBarSide></AdminNavBarSide>
  <section>
    <div>
      <div class="admin-games-header">
        <RouterLink to="/admin/listgames">Retour</RouterLink>
        <div class="admin-games-title">
          <img src="../../assets/svg/games.svg" alt="">
          <h1>JEUX</h1>
        </div>
      </div>
      <h2>MODIFIER UN JEU</h2>
      <form @submit.prevent="validateAndEditToAPI" @keydown="handleKeyDown">
        <div class="field-main-container">
          <div class="field-container">
            <label for="title">Titre</label>
            <input type="text" id="title" name="title" v-model="game.title" @input="resetSuccessMessage" required>

            <label for="genreName">Genre</label>
            <div class="select-container">
              <select name="genreName" id="genreName" v-model="game.genre.name" @change="fetchGenreData"
                @input="resetSuccessMessage" required>
                <option value="">genre</option>
                <option v-for="genre in listGenres" :key="genre" :value="genre">{{ genre }}</option>
              </select>
              <span class="select-arrow"></span>
            </div>

            <label for="price" class="price-label">Prix</label>
            <input type="text" id="price" name="price" v-model="formattedPrice"
              @input="validatePrice; resetSuccessMessage" required>
            <p v-if="priceError" style="color: red;">Le prix doit être un nombre valide.</p>

            <label for="discount" class="price-label">Réduction</label>
            <input type="text" id="discount" name="discount" v-model="formattedDiscount"
              @input="validateDiscount; resetSuccessMessage" required>
            <p v-if="discountError" style="color: red;">La réduction doit être un nombre valide.</p>
          </div>

          <div class="field-container">
            <label for="developer">Développeur</label>
            <div class="select-container">
              <select name="developer" id="developer" v-model="game.developer" @input="resetSuccessMessage" required>
                <option value="">développeur</option>
                <option :value="developer" v-for="developer in listDevelopers" :key="developer">{{ developer }}</option>
              </select>
              <span class="select-arrow"></span>
            </div>

            <label for="developer">Plateforme</label>
            <div class="select-container">
              <select name="platform" id="platform" v-model="game.platform" @input="resetSuccessMessage" required>
                <option value="">plateforme</option>
                <option :value="platform" v-for="platform in listPlatform" :key="platform">{{ platform }}</option>
              </select>
              <span class="select-arrow"></span>
            </div>

            <label for="rating">Restriction d'âge</label>
            <div class="select-container">
              <select name="rating" id="rating" v-model="game.rating" @input="resetSuccessMessage" required>
                <option value="">rating</option>
                <option :value="rating" v-for="rating in listRatings" :key="rating">{{ rating }}</option>
              </select>
              <span class="select-arrow"></span>
            </div>

            <label for="releasedate">Date de sortie</label>
            <input type="date" id="releasedate" name="releasedate" @input="resetSuccessMessage" required
              v-model="game.release_date">
          </div>
        </div>

        <div class="field-main-container">
          <div class="field-container">
            <label for="features">Fonctionnalités (max: 5)</label>
            <input type="text" id="features" name="features" placeholder="fonctionnalité" v-model="newFeature"
              @input="resetSuccessMessage">
            <button type="button" @click="addFeature" :disabled="game.features.length >= 5">Ajouter</button>
          </div>
          <div class="field-container">
            <div class="added-features-container">
              <ul>
                <li v-for="(feature, index) in game.features" :key="index">
                  <span>- {{ feature }}</span>
                  <button type="button" @click="removeFeature(index)"></button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="field-secondary-container">
          <label for="description">Description</label>
          <textarea class="description-textarea" name="description" id="description" cols="30"
            placeholder="Mon jeu est..." rows="10" v-model="game.description"
            @input="limitDescription; resetSuccessMessage" required></textarea>
          <span>{{ remainingCharacters }} mots restants.</span>

          <label for="imageUpload">Image (min: 390x390)</label>
          <input type="file" id="imageUpload" name="image" accept="image/jpeg" @change="handleImageUpload"
            @input="resetSuccessMessage" ref="imageInput" style="display: none;">
          <button type="button" id="customImageUpload" @click="triggerImageUpload">
            Choisir une image
          </button>
          <div class="img-input-container">
            <img id="uploadedImage" v-if="imagePath" :src="imagePath" alt="Uploaded Image">
          </div>
          <input type="hidden" name="img" :value="imagePath">
          <input type="hidden" name="featImg" :value="featImgPath">

          <label for="featImg">Image secondaire (1280x730)</label>
          <input type="file" id="featImg" name="featImg" accept="image/jpeg" @input="resetSuccessMessage"
            @change="handleFeatImgUpload" ref="featImgInput" style="display: none;">
          <button type="button" id="customFeatImgUpload" @click="triggerFeatImgUpload">
            Choisir une image secondaire
          </button>
          <div class="featimg-input-container">
            <img id="uploadedFeatImage" v-if="featImgPath" :src="featImgPath" alt="Uploaded Image">
          </div>

          <button type="submit" value="submit">SAUVEGARDER</button>
          <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
          <button id="deleteGame" @click="confirmDelete" type="button" value="button">SUPPRIMER LE JEU</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import AdminNavBarSide from '../../components/Admin/AdminNavBarSide.vue';
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import type { Game } from '../../interfaces/interfaces';
import { useRoute } from 'vue-router';

const listGenres = ['Horreur', 'RPG', 'MMO', 'Course', 'Action', 'Musique', 'Shooter', 'Simulation', 'Stratégie', 'Puzzle', 'Sport', 'Plateforme'];
const listRatings = ['3', '7', '12', '16', '18'];
const imgRatings = ['/src/assets/png/pegi3.webp', '/src/assets/png/pegi7.webp', '/src/assets/png/pegi12.webp', '/src/assets/png/pegi16.webp', '/src/assets/png/pegi18.webp'];
const listDevelopers = ['Ludus Studios'];
const listPlatform = ['LS Play'];

const imagePath = ref('');
const featImgPath = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const priceError = ref(false);
const discountError = ref(false);
const newFeature = ref('');
const imageInput = ref<HTMLInputElement | null>(null);
const featImgInput = ref<HTMLInputElement | null>(null);

const route = useRoute();
const Games = ref<any[]>([]);
const gameToEdit = ref<{ title: string }>({ title: '' });

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const game = ref<Game>({
  title: '',
  genre: {
    name: '',
    description: '',
    images: []
  },
  price: 79.99,
  rating: '',
  description: '',
  img: '',
  developer: '',
  discount: 0,
  platform: '',
  features: [],
  release_date: new Date(),
  images: []
});

onMounted(() => { // récupère le jeu à éditer
  gameToEdit.value.title = route.params.gameTitle as string;
  axios.get(`${apiBaseUrl}/api/get/title/${gameToEdit.value.title}`)
    .then((response) => {
      const fetchedGame = response.data[0];
      console.log("Fetched Game:", fetchedGame);
      fetchedGame.release_date = formatDateForInput(fetchedGame.release_date);
      game.value = fetchedGame;
      imagePath.value = fetchedGame.img; // initialiser imagePath avec l'image principale du dossier jpg
      featImgPath.value = fetchedGame.images[0]; // initialiser featImgPath avec l'image secondaire du dossier jpg
      console.log(response.data);

      const index = imgRatings.indexOf(game.value.rating); // convert the rating image path to the numeric rating
      game.value.rating = index !== -1 ? listRatings[index] : '';
    })
    .catch((err) => {
      console.log(err);
    })
});

const EditToAPI = () => { // modifie un jeu
  const index = listRatings.indexOf(game.value.rating); // convert numeric rating back to image path before sending to API
  game.value.rating = index !== -1 ? imgRatings[index] : '';
  axios.put(`${apiBaseUrl}/api/update/${game.value._id}`, game.value)
    .then((response) => {
      successMessage.value = 'Votre jeu a été modifié avec succès';
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const validateAndEditToAPI = () => {
  if (!imagePath.value) {
    errorMessage.value = 'Veuillez sélectionner une image principale.';
    return;
  }
  if (!featImgPath.value) {
    errorMessage.value = 'Veuillez sélectionner une image secondaire.';
    return;
  }
  errorMessage.value = '';
  EditToAPI();
};

const confirmDelete = () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce jeu?")) {
    deleteToAPI();
  }
};

const deleteToAPI = () => { // supprime un jeu
  axios.delete(`${apiBaseUrl}/api/delete/${game.value._id}`)
    .then((response) => {
      successMessage.value = 'Votre jeu a été supprimé avec succès';
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const triggerImageUpload = () => {
  if (imageInput.value) {
    imageInput.value.click();
  }
};

const triggerFeatImgUpload = () => {
  if (featImgInput.value) {
    featImgInput.value.click();
  }
};

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatPrice = (price: number) => {
  return price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const parseFormattedPrice = (formattedPrice: string) => {
  return parseFloat(formattedPrice.replace(',', '.'));
}

const formattedPrice = computed({
  get() {
    return formatPrice(game.value.price);
  },
  set(value: string) {
    game.value.price = parseFormattedPrice(value);
  }
});

const formattedDiscount = computed({
  get() {
    return formatPrice(game.value.discount);
  },
  set(value: string) {
    game.value.discount = parseFormattedPrice(value);
  }
});

const validatePrice = () => {
  const price = parseFloat(game.value.price.toString());
  priceError.value = isNaN(price) || price < 0;
};

const validateDiscount = () => {
  const discount = parseFloat(game.value.discount.toString());
  discountError.value = isNaN(discount) || discount < 0;
};

const deleteImage = () => {
  imagePath.value = '';
  game.value.img = '';
};

const addFeature = () => {
  const feature = newFeature.value.trim();
  if (feature && game.value.features.length < 5) {
    game.value.features.push(feature);
    newFeature.value = '';
  }
};

const removeFeature = (index: any) => {
  game.value.features.splice(index, 1);
};

const fetchGenreData = async () => {
  const genreName = game.value.genre.name;
  try {
    const response = await axios.get(`http://localhost:3000/api/get/${genreName}`);
    const genreData = response.data;
    game.value.genre.description = genreData[0].genre.description;
    game.value.genre.images = genreData[0].genre.images;
  } catch (error) {
    console.error('Error fetching genre data:', error);
  }
};

const maxDescriptionLength = 1500;

const limitDescription = () => {
  if (game.value.description.length > maxDescriptionLength) {
    game.value.description = game.value.description.substring(0, maxDescriptionLength);
  }
};

const remainingCharacters = computed(() => {
  return maxDescriptionLength - game.value.description.length;
});

const ratingImage = computed(() => {
  const index = listRatings.indexOf(game.value.rating);
  return index !== -1 ? imgRatings[index] : '';
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};

const resetSuccessMessage = () => {
  successMessage.value = '';
};

const handleImageUpload = (event: Event) => { // fonction qui prend un événement en argument et appelée lorsqu'un (event) user télécharge une image
  const file = (event.target as HTMLInputElement).files?.[0]; // as HTMLInputElement, nous disons au compilateur TypeScript de considérer event.target comme étant de type HTMLInputElement, ce qui nous permet d'accéder à ses propriétés spécifiques, comme files qui contient les fichiers téléchargés et récupère le premier fichier dans le tableau des fichiers téléchargés; L'opérateur de coalescence nulle ?. est utilisé pour éviter une erreur si aucun fichier n'est sélectionné
  if (file) { // vérifie si un fichier a été sélectionné pour le téléchargement
    const formData = new FormData(); // crée un nouvel objet FormData utilisé pour construire un ensemble de paires clé-valeur qui seront envoyées dans la requête HTTP
    formData.append('image', file); // ajoute le fichier téléchargé à l'objet FormData avec la clé 'image'; ça prépare les données du formulaire à être envoyées au serveur
    axios.post(`${apiBaseUrl}/api/upload`, formData, { // envoie une requête POST au serveur à l'URL spécifiée avec les données du formulaire contenues dans l'objet formData
      headers: { // ces en-têtes spécifient le type de contenu de la requête comme multipart/form-data, ce qui indique au serveur que le formulaire contient des données binaires, telles que des fichiers
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => { // gère la réponse de la requête POST; si la requête est réussie, cette fonction est exécutée avec la réponse de la requête.
        // console.log('Response from server:', response);
        imagePath.value = response.data.imagePath; // affecte l'URL de l'image à la variable imagePath (response.data.imagePath peut s'écrire response.data.monImage)
        errorMessage.value = ''; // pas d'erreur donc pas de message d'erreur
        game.value.img = response.data.imagePath; // affecte l'URL de l'image à la propriété img de l'objet game.value
        // console.log('Uploaded image URL:', imagePath.value);
        const reader = new FileReader(); // affiche l'image; nous créons une instance de l'objet FileReader qui nous permettra de lire le contenu du fichier que l'utilisateur a sélectionné
        reader.onload = (e) => { // nous définissons une fonction à exécuter lorsque le contenu du fichier est chargé; la variable e représente l'événement de chargement
          if (e.target) { // nous vérifions si la cible de l'événement de chargement existe; en JS, e.target fait référence à l'élément qui a déclenché l'événement, dans ce cas, notre objet FileReader
            const imageSrc = e.target.result; // nous récupérons l'URL de données (data URL) du fichier chargé à partir de la propriété result de notre objet FileReader qui représente les données du fichier sous forme d'URL qui peut être utilisée pour afficher le contenu du fichier, par exemple, dans une balise <img>
            const uploadedImageElement = document.getElementById('uploadedImage');
            if (uploadedImageElement instanceof HTMLImageElement) { // nous vérifions si l'élément que nous avons sélectionné est une balise <img>, en utilisant l'opérateur instanceof qui garantit que nous n'essayons pas d'attribuer la source de l'image à un élément incorrect
              uploadedImageElement.src = imageSrc as string; // si l'élément est bien une balise <img>, nous attribuons l'URL de données (data URL) récupérée à sa propriété src
            }
          } else {
            console.error('Error reading file: FileReader target is null.');
          }
        };
        reader.readAsDataURL(file); // nous demandons à l'objet FileReader de lire le contenu du fichier spécifié; nous utilisons readAsDataURL, ce qui signifie que le contenu du fichier sera lu sous forme d'URL de données
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        imagePath.value = ''; // si erreur l'URL est réinitialisée à une chaine vide
        errorMessage.value = 'Error uploading image. Please try again.';
      });
  }
  else {

  }
};

const handleFeatImgUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append('featImg', file);
    axios.post(`${apiBaseUrl}/api/upload'`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        featImgPath.value = response.data.featImgPath;
        errorMessage.value = '';
        game.value.images = [response.data.featImgPath];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const imageSrc = e.target.result;
            const featImgElement = document.getElementById('uploadedFeatImage');
            if (featImgElement instanceof HTMLImageElement) {
              featImgElement.src = imageSrc as string;
            }
          } else {
            console.error('Error reading file: FileReader target is null.');
          }
        };
        reader.readAsDataURL(file);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        featImgPath.value = '';
        errorMessage.value = 'Error uploading image. Please try again.';
      });
  }
};
</script>

<style scoped>
.success-message {
  margin-top: 1em;
}

.price-label {
  position: relative;
  display: inline-block;
}

.price-label::before {
  content: '€';
  position: absolute;
  left: 86%;
  top: 53px;
  transform: translateY(-50%);
  color: var(--text-color-secondary);
  font-size: 1em;
}

#deleteGame {
  background-color: rgb(133, 9, 9);
  margin-top: 10em;
  margin-left: auto;

  &:hover {
    background-color: rgb(187, 1, 1);
  }
}

a {
  background-color: rgb(234, 149, 74);
  border-radius: var(--border-radius);
  color: var(--text-color-secondary);
  padding: 5px 15px;
  margin-right: auto;
}

section {
  color: var(--text-color-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;

  h2 {
    font-size: 20px;
  }

  .admin-games-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    padding: 2em 0 1em;
    width: 80%;

    a {
      display: block;
      margin-right: 5em;

      &:hover {
        background-color: #e26f03;
      }
    }

    .admin-games-title {
      display: flex;
      align-items: center;
      gap: 1em;
    }

    img {
      height: 70px;
      display: block;
    }
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(23, 24, 33, .93);
  padding: 1em 2em;
  border-radius: var(--border-radius);
  margin: 2em 0 0 0;
  gap: 1em;

  label {
    padding: 5px 0em;
  }

  input,
  select,
  button {
    background-color: #FEA14C;
    border: none;
    border-radius: var(--border-radius);
    padding: 10px 1em;
    margin-bottom: 1em;
    color: var(--text-color-secondary);
    width: 200px;
    appearance: none;

    &::placeholder {
      color: var(--text-color-secondary);
    }
  }

  button[type=submit] {
    font-weight: bolder;
    font-size: 16px;
    margin-top: 20px;
    background-color: #22510d;
    margin-top: 3em;

    &:hover {
      background-color: #307311;
    }
  }

  textarea {
    border-radius: var(--border-radius);
    background-color: transparent;
    border: 3px solid #FEA14C;
    color: var(--text-color-secondary);
    resize: none;

    &::placeholder {
      color: var(--text-color-secondary);
      padding: 5px 0 0 5px;
    }
  }
}

.field-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.field-container {
  display: flex;
  flex-direction: column;
}

.field-secondary-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;

  span {
    padding: 5px 0 2em;
  }
}

.features-main-container {
  display: flex;
}

.features-container {
  display: flex;
  flex-direction: column;
}

.img-input-container {
  display: none;
}

.featimg-input-container {
  display: none;
}

.added-features-container {
  display: flex;
  height: 200px;
  width: 200px;
  background-color: rgb(234, 149, 74);
  border-radius: var(--border-radius);
  font-size: 13px;
  padding: 7px 5px;
  overflow-y: auto;

  ul li {
    display: flex;

    button {
      background-color: transparent;
      width: 10px;
      height: 21px;
      background-image: url('../../assets/svg/trashcan.svg');
      background-repeat: no-repeat;
      background-position: center;
      margin: 0 5px 0 5px;
    }
  }
}

.select-container {
  position: relative;
}

.select-arrow::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: 5%;
  top: 40%;
  transform: translate(-50%, -50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgb(223, 223, 223);
}

input::-webkit-outer-spin-button,
/* Chrome, Safari, Edge, Opera */
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


/***** MEDIA QUERIES *****/
@media (min-width : 800px) {
  .field-main-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 3em;
  }

  .price-label::before {
    left: 89%;
  }

  .description-textarea {
    width: 450px;
    height: 250px;
  }

  .description-textarea {
    width: 450px;
    height: 250px;
  }

  .img-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 200px;
    margin: 0 auto;
    background-color: rgba(234, 149, 7, 0.2);
    border-radius: var(--border-radius);
    margin-bottom: 2em;

    img {
      width: 190px;
      height: 190px;
    }
  }

  .featimg-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 200px;
    margin: 0 auto;
    background-color: rgba(234, 149, 7, 0.2);
    border-radius: var(--border-radius);
    margin-bottom: 2em;

    img {
      width: 300px;
      height: 173px;
    }
  }

  form {
    padding: 1em 4em;

    input,
    select,
    button {
      width: 280px;
    }
  }

  .added-features-container {
    width: 280px;
  }

  label {
    padding: 0 1em;
  }
}
</style>