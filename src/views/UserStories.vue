<template>
  <div>

  </div>
</template>

<script setup lang="ts"></script>
<style></style>

<!-- <template>
  <div class="bg-actus">
    <h1>Dernières actus</h1>
  </div>

  <section class="stories-section">
    <div class="stories-grid">
      <div class="stories-block" v-for="(story, index) in stories" :key="story.date">
        <RouterLink to="/story">
          <div class="stories-header" :style="{ backgroundImage: `url(${story.img})` }"></div>
          <div class="stories-content">
            <span>Ludus Studios</span>
            <span>{{ story.date }}</span>
            <h3>{{ story.title }}</h3>
            <p>{{ story.desc }}</p>
          </div>
        </RouterLink to="/story">
      </div>
    </div>
    <div class="more-stories">
      <img src="../../assets/svg/plus-stories.svg" alt="Plus d'actualités">
      <p>PLUS</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stories = ref([
  { date: '9 avr. 2024', img: 'src/assets/jpg/fond-bleu-shadow.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/png/bg-purple.png', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/fond-bleu-shadow.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/orange-bg.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/fond-bleu-shadow.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/png/bg-purple.png', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/fond-bleu-shadow.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/png/bg-purple.png', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/fond-bleu-shadow.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/orange-bg.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/fond-bleu-shadow.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/png/bg-purple.png', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
])
</script>

<style scoped>
.bg-actus {
  /* background-image: url('../assets/jpg/purple-bg-waves.jpg'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 75%;
  min-height: 250px;
  color: var(--text-color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
}

.stories-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F3F3F3;
  margin-bottom: 2rem;

  .stories-grid {
    place-items: center;
    padding-top: 2rem;

    .stories-block {
      max-width: 319px;
      border-radius: var(--border-radius);
      box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.5);

      &:hover,
      &:focus {
        transform: translateY(-0.5em);
        transition: transform 0.3s;
      }

      .stories-header {
        /* background-image: url('../assets/jpg/fond-bleu-shadow.jpg'); */
        background-size: cover;
        border-radius: 8px 8px 0 0;
        min-height: 13rem;
      }

      .stories-content {
        padding: 20px;

        :is(span) {
          font-weight: 700;
          font-size: 14px;
        }

        span:nth-child(1) {
          color: #FF4747;
        }

        span:nth-child(2) {
          padding-left: 40px;
        }

        h3,
        p {
          padding-top: 5px;
        }
      }
    }
  }

  &>a {
    margin-top: 2rem;

    &:hover,
    &:focus {
      box-shadow: 0 0.5em 0.5em -0.4em var(--text-color-primary);
    }
  }

  .more-stories {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 50%;
    margin: 3em 0;
    padding: 10px 0;
    border: 2px solid grey;
    color: grey;
    font-weight: 600;
  }
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(var(--n, 1), 1fr);
  grid-gap: 2rem;

  @media (width > 55em) {
    --n: 2;
  }

  @media (width > 80em) {
    --n: 3;
  }
}

@media (min-width: 450px) {
  .stories-section {
    .stories-grid {
      .stories-block {
        max-width: 390px;
      }
    }
  }
}
</style> -->