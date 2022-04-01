<template>
  <div class="column is-8">
    <div class="content">
      <h1>New user</h1>
      <hr>
      <h3>User name:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="username" placeholder="John Doe" v-model="name">
        </p>
      </div>
      <h3>Email:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="email" placeholder="email@email.com" v-model="email">
        </p>
      </div>
      <h3>Password:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="password" name="password" placeholder="*******" v-model="password">
        </p>
      </div>
      <hr>
      <button v-bind:class="{ 'is-disabled' : !(this.name !== '' && this.email !== '' && this.password !== '') }" type="button"  class="button is-primary" @click="submit">Register</button>
      <button type="button" class="button is-danger" @click="exit">Exit</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  export default {
    name: 'newItemForm',
    data: () => ({
      name: '',
      email: '',
      password: '',
    }),
    methods: {
      submit() {
        const { name, email, password } = this;
        this.http.post('/users/register', { name, email, password })
          .then(() => this.$router.push({ name: 'users.list' }))
          .catch(err => console.log(err));
      },
      exit() {
        this.$router.push({ name: 'users.list' });
      },
    },
  };
</script>
