<template>
  <div class="column is-8">
    <div class="content">
      <h1>New Post</h1>
      <hr>
      <h3>Post name:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="itemName" placeholder="Name" v-model="name">
        </p>
      </div>
      <h3>Author:</h3>
      <div class="field">
          <h1 class="input is-medium">{{getUser.name}}</h1>
      </div>
      <h3>Content:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="status" placeholder="Content" v-model="content">
        </p>
      </div>
      <hr>
      <button v-bind:class="{ 'is-disabled' : !(this.name !== ''&& this.content !== '') }" type="button" class="button is-primary" @click="submit">Create item</button>
      <button type="button" class="button is-danger" @click="exit">Exit</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import { mapGetters } from 'vuex';

  export default {
    name: 'newItemForm',
    data: () => ({
      name: '',
      author: '',
      content: '',
    }),
    computed: {
      ...mapGetters(['getUser']),
    },
    methods: {
      submit() {
        // eslint-disable-next-line prefer-const
        const { name, content } = this;
        const user = this.$store.getters.getUser.name;
        this.http.post('/items/register', { name, content, user })
          .then(() => this.$router.push({ name: 'items.list' }))
          .catch(err => console.log(err));
      },
      exit() {
        this.$router.push({ name: 'items.list' });
      },
    },
  };
</script>
