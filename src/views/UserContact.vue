<template>
  <div>

  </div>
</template>

<script setup lang="ts"></script>
<style></style>

<!-- <template>
  <section>
    <div class="contact-container">
      <h1>Contactez-nous</h1>
      <form class="contact-form">
        <div class="form-group">
          <label for="name">Nom:</label>
          <input type="text" id="name" autocomplete="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" autocomplete="email" required />
        </div>
        <div class="form-group">
          <label for="phone">Téléphone:</label>
          <input type="tel" id="phone" autocomplete="tel" />
        </div>
        <div class="form-group">
          <label for="subject">Sujet:</label>
          <input type="text" id="subject" autocomplete="off" />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" autocomplete="off" required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
      <div class="confirmation-message">
        <p>Merci de nous avoir contacté! Nous reviendrons rapidement vers vous.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = document.querySelector('contact-form');
function sendEmail() {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "username",
    Password: "password",
    To: 'them@website.com',
    From: "you@isp.com",
    Subject: "This is the subject",
    Body: "And this is the body"
  }).then(
    message => alert(message)
  );
}

</script>

<style scoped>
section {
  /* background-image: url('../assets/jpg/puzzle-contact4.jpg'); */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--text-color-secondary);
}

.contact-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

button {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.confirmation-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  color: #155724;
}

@media (min-width: 768px) {
  .contact-container {
    max-width: 700px;
  }
}
</style> -->
