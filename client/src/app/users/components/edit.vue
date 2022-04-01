<template>
  <div class="column is-8">
    <div class="columns">
      <div class="column content">
        <h1>Current user</h1>
        <hr>
        <h3>User name:</h3>
        <div class="field">
          <p class="control">
            {{user.name}}
          </p>
        </div>
        <h3>Access level:</h3>
        <div class="field">
          <p class="control">
            {{user.accessLevel}}
          </p>
        </div>
        <h3>E-mail:</h3>
        <div class="field">
          <p class="control">
            {{user.email}}
          </p>
        </div>
      </div>
      <div class="column content">
        <h1>Edit user</h1>
        <hr>
        <h3>User name:</h3>
        <div class="field">
          <p class="control">
            <input class="input is-medium" type="text" name="itemName" placeholder="John Doe" v-model="name">
          </p>
        </div>
        <h3>Access level:</h3>
        <div class="field">
          <p class="control">
            <input class="input is-medium" type="text" name="accessLevel" placeholder="Admin" v-model="accessLevel">
          </p>
        </div>
        <h3>E-mail:</h3>
        <div class="field">
          <p class="control">
            <input class="input is-medium" type="text" name="email" placeholder="email@email.com" v-model="email">
          </p>
        </div>
        <h3>Password:</h3>
        <div class="field">
          <p class="control">
            <input class="input is-medium" type="password" name="password" placeholder="Password" v-model="password">
          </p>
        </div>
        <hr>
        <button v-bind:class="{ 'is-disabled' : this.name === '' && this.accessLevel === '' && this.email === '' && this.password === '' }" type="button"  class="button is-primary" @click="edit">Edit</button>
        <button type="button" class="button is-danger" @click="exit">Exit</button>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'userEditForm',
    data: () => ({
      name: '',
      accessLevel: '',
      email: '',
      password: '',
      user: [],
    }),
    beforeMount() {
      // eslint-disable-next-line no-underscore-dangle
      this.http.get(`/users/${this.$route.params._id}`)
        .then((res) => {
          this.user = res.data;
          if (this.user.admin === true) this.user.accessLevel = 'Admin';
          if (this.user.admin === false) this.user.accessLevel = 'User';
        });
    },
    methods: {
      edit() {
        const data = {};
        if (this.name) data.name = this.name;
        if (this.email) data.email = this.email;
        if (this.password) data.password = this.password;
        if (this.accessLevel === 'Admin') data.admin = true;
        if (this.accessLevel === 'User') data.admin = false;
        if (data !== {}) {
          this.http.put(`/users/${this.$route.params._id}`, data)
            .then(() => this.$router.push({ name: 'users.list' }))
            .catch(err => console.log(err));
        }
      },
      exit() {
        this.$router.push({ name: 'users.list' });
      },
    },
  };
</script>
