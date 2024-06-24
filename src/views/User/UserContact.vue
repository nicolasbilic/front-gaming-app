<template>
  <section class="contact-container">
    <img src="../../assets/jpg/contact-bg-img.webp" alt="Personnage de jeux-vidéo en arrière-plan" />
    <div class="contact-form-container">
      <h1>Contactez-nous</h1>
      <form ref="form" @submit.prevent="handleSubmit" class="contact-form">
        <!-- Nom -->
        <div class="contact-form-group">
          <label for="name" class="game-label">Nom</label>
          <input type="text" name="user_name" id="name" class="game-input" v-model="name" @input="validateName"
            @blur="markNameTouched" @click="resetConfirmationMessage" placeholder="Jean Dupont" required>
          <span v-if="nameTouched && (!nameValid || name === '')" class="error-message">Votre nom est obligatoire et ne
            doit comporter que des lettres.</span>
        </div>
        <!-- Email -->
        <div class="contact-form-group">
          <label for="email" class="game-label">Email</label>
          <input type="email" name="user_email" id="email" class="game-input" v-model="email" @input="validateEmail"
            @blur="markEmailTouched" @click="resetConfirmationMessage" placeholder="jean.dupont@gmail.com" required>
          <span v-if="emailTouched && (!emailValid || email === '')" class="error-message">Veuillez entrer une adresse
            email
            valide.</span>
        </div>
        <!-- Sujet -->
        <div class="contact-form-group">
          <label for="subject" class="game-label">Sujet</label>
          <input type="text" name="user_subject" id="subject" class="game-input" v-model="subject"
            @input="validateSubject" @blur="markSubjectTouched" @click="resetConfirmationMessage"
            placeholder="Mon sujet" required>
          <span v-if="subjectTouched && (!subjectValid || subject === '')" class="error-message">Le sujet est
            obligatoire et ne
            doit comporter que des symboles valides.</span>
        </div>
        <!-- Message -->
        <div class="contact-form-group">
          <label for="message" class="game-label">Message</label>
          <textarea name="message" id="message" class="game-textarea" v-model="message" @input="validateMessage"
            @blur="markMessageTouched" @click="resetConfirmationMessage" placeholder="Mon message" required></textarea>
          <span v-if="messageTouched && (!messageValid || message === '')" class="error-message">Ce champ est
            obligatoire et ne doit comporter que des symboles valides.</span>
        </div>
        <!-- Consent -->
        <div class="contact-form-group checkbox-group">
          <label for="consent">J'accepte la <a href="/" target="_blank">politique de
              confidentialité</a>.</label>
          <input type="checkbox" id="consent" v-model="consent" @change="validateConsent" required>
        </div>
        <span v-if="!consentValid" class="error-message">Vous devez accepter la politique de
          confidentialité.</span>

        <input type="submit" value="Envoyer" class="game-submit">

        <div class="confirmation-message" v-if="isEmailSent">
          <p>Merci de nous avoir contacté! Nous reviendrons rapidement vers vous.</p>
        </div>
      </form>
    </div>
  </section>
  <UserSocials />
  <UserFooter />
</template>
<script setup lang="ts">
import UserSocials from '../../components/User/UserSocials.vue'
import UserFooter from '../../components/User/UserFooter.vue';
import { ref } from 'vue';
import emailjs from '@emailjs/browser';

const apiKey = import.meta.env.VITE_EMAIL_API_KEY;
const form = ref<HTMLFormElement | null>(null);
const isEmailSent = ref(false);

//Nom
const nameTouched = ref(false);
const markNameTouched = () => {
  nameTouched.value = true;
};

const name = ref('');
const nameValid = ref(true);
const validateName = () => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s']*$/;
  nameValid.value = nameRegex.test(name.value) && name.value.length <= 50; //nameValid existera (true) si le nom respecte l'expression régulière sinon non 
  nameValid.value = nameValid.value && name.value !== '';
};

//Email
const emailTouched = ref(false);
const markEmailTouched = () => {
  emailTouched.value = true;
};

const email = ref('');
const emailValid = ref(true);
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailValid.value = emailRegex.test(email.value) && email.value.length <= 100;
  emailValid.value = emailValid.value && email.value !== '';
};

//Sujet
const subjectTouched = ref(false);
const markSubjectTouched = () => {
  subjectTouched.value = true;
};

const subject = ref('');
const subjectValid = ref(true);
const validateSubject = () => {
  const subjectRegex = /^[a-zA-ZÀ-ÿ0-9\s,.!?-]*$/; //autorise les lettres, chiffres, espaces et certaines ponctuations
  subjectValid.value = subjectRegex.test(subject.value) && subject.value.length <= 200;
  subjectValid.value = subjectValid.value && subject.value !== '';
};

//Message
const messageTouched = ref(false);
const markMessageTouched = () => {
  messageTouched.value = true;
};

const message = ref('');
const messageValid = ref(true);
const validateMessage = () => {
  const messageRegex = /^[a-zA-ZÀ-ÿ0-9\s,.!?()'"`\-–—$€£]*$/; //autorise les lettres, chiffres, espaces, ponctuation Courante, certains caractères spéciaux et symboles monétaires
  messageValid.value = messageRegex.test(message.value) && message.value.length >= 5 && message.value.length <= 1000;
  messageValid.value = messageValid.value && message.value !== '';
};

//Consent
const consentTouched = ref(false);
const markConsentTouched = () => {
  consentTouched.value = true;
};

const consent = ref(false);
const consentValid = ref(true);
const validateConsent = () => {
  consentValid.value = consent.value;
};

const validateForm = () => {
  validateName();
  validateEmail();
  validateSubject();
  validateMessage();
  validateConsent();
  return nameValid.value && emailValid.value && subjectValid.value && messageValid.value && consentValid.value;
};

const sendEmail = () => {
  if (form.value && validateForm()) {
    emailjs
      .sendForm('contact_service', 'contact_form', form.value, apiKey)
      .then(
        () => {
          console.log('SUCCESS! it is sent');
          isEmailSent.value = true;
          resetForm();
        },
        (error) => {
          console.log('FAILED to send...', error.text);
        },
      );
  } else {
    console.log('Form reference is null, aucun élément html de formulaire trouvé');
  }
};

const markAllTouched = () => {
  nameTouched.value = true;
  emailTouched.value = true;
  subjectTouched.value = true;
  messageTouched.value = true;
  consentTouched.value = true;
};

const handleSubmit = () => {
  markAllTouched();
  if (validateForm()) {
    sendEmail();
  }
};

const resetForm = () => {
  name.value = '';
  nameValid.value = true;
  nameTouched.value = false;
  email.value = '';
  emailValid.value = true;
  emailTouched.value = false;
  subject.value = '';
  subjectValid.value = true;
  subjectTouched.value = false;
  message.value = '';
  messageValid.value = true;
  messageTouched.value = false;
  consent.value = false;
  consentValid.value = true;
  consentTouched.value = false;
};

const resetConfirmationMessage = () => {
  isEmailSent.value = false;
};

</script>
<style scoped>
.contact-container {
  position: relative;
  background: linear-gradient(to bottom, #B1BCBF, #ffffff);
  /* fond dégradé */
  z-index: 0;
}

.contact-container img {
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  height: 100%;
  z-index: -1;

  @media (width < 870px) {
    display: none;
  }
}

.contact-form-container {
  margin: 0 auto;
  /* center the form */
  padding: 4rem 0;
  max-width: 300px;
  /* set the maximum width of the form */

  @media (width > 575px) {
    max-width: 500px;
  }

  @media (width > 768px) {
    max-width: 700px;
  }
}

.contact-form {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
}

.contact-form-group {
  margin-bottom: 20px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group label a {
  color: #0056b3;
}

.checkbox-group input {
  width: 5%;
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
}

textarea {
  resize: none;
  height: 7rem;
}

input,
textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type='submit'] {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
}

.error-message {
  color: red;
}

.confirmation-message {
  display: block;
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  color: #155724;
}
</style>