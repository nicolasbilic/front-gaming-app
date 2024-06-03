<template>
  <div>

  </div>
</template>

<script setup lang="ts"></script>
<style></style>

<!-- <template>
  <div class="bg-actu">
    <div class="bg-actu-content">
      <h1>Innovation majeure : une
        technologie de mémoire
        révolutionnaire créée par un
        employé de Ludus Studios</h1>
      <p>Moins de mémoire, un coût réduit et
        une avancée significative en matière de développement durable.</p>
    </div>
  </div>

  <section class="actu-content">
    <p>
      Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié
      la mémoire requise pour les jeux-vidéos AAA.. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
      mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
      auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
      amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel eu.
    </p>
    <br>
    <p>Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
      sodales. Quisque sagittis orci ut diam condimentum, vel eu.</p>
    <br>
    <p>Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales
      sodales. Quisque sagittis orci ut diam condimentum, vel eu.</p> <br>
    <h2>Que fait cette technologie révolutionnaire ?</h2> <br>
    <p>Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
      Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
      interdum eu.</p> <br>
    <p>Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
      Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
      interdum eu.</p> <br>
    <p>Lorem ipsum dolor.</p>
    <br>
    <h2>La route vers la révolution</h2>
    <br>
    <p>Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
      Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
      interdum eu.</p> <br>
    <p>Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
      Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
      interdum eu.</p> <br>
    <p>Lorem ipsum dolor.</p> <br>
    <p><span style="color: red;">Rejoignez Ludus Studios</span>, où notre mission est d'inspirer le monde par l’action.
      Ensemble, nous pouvons réaliser l'impossible.</p>
    <br>
    <br>
    <br>
    <h2>Actualités connectées</h2>
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
    </section>
  </section>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const stories = ref([
  { date: '9 avr. 2024', img: 'src/assets/jpg/orange-bg.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/jpg/fond-bleu-shadow.jpg', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' },
  { date: '9 avr. 2024', img: 'src/assets/png/bg-purple.png', title: 'Innovation majeure : une technologie de mémoire créée par un ...', desc: 'Steve Lambert, employé chez Ludus Studios a créé une technologie de mémoire révolutionnaire qui réduit de moitié la mémoire requise pour les jeux-vidéos AAA.' }
])

</script>

<style scoped>
.bg-actu {
  /* background-image: url('../assets/jpg/fond-bleu-shadow.jpg'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 350px;
  color: var(--text-color-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  .bg-actu-content {
    position: absolute;
    width: 50%;
    left: 8em;

    @media (width < 900px) {
      width: 80%;
      left: 3em;

      h1 {
        font-size: 24px;
      }
    }

    p {
      padding-top: 1em;
      width: 70%;
    }
  }
}

.actu-content {
  display: flex;
  flex-direction: column;
  margin: 0 8em;
  padding: 2em 0;

  @media (width < 900px) {
    margin: 0 2em;
  }
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