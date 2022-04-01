<template>
  <div class="column is-8">
    <div class="columns">
      <div class="column content">
        <h1>Current Post</h1>
        <hr>
        <h3>Post name:</h3>
        <div class="field">
          <p class="control">
            {{item.name}}
          </p>
        </div>
        <h3>Author:</h3>
        <div class="field">
          <p class="control">
            {{item.author}}
          </p>
        </div>
        <h3>Content:</h3>
        <div class="field">
          <p class="control">
            {{item.content}}
          </p>
        </div>
      </div>
      <div class="column content">
        <h1>Edit Post</h1>
        <hr>
        <h3>Post name:</h3>
        <div class="field">
          <p class="control">
            <input class="input is-medium" type="text" name="itemName" placeholder="Name" v-model="name">
          </p>
        </div>
        <h3>Author:</h3>
        <div class="field">
          <p class="control">
            <input class="input is-medium" type="text" name="author" placeholder="User" v-model="author">
          </p>
        </div>
        <h3>Content:</h3>
        <div class="field">
          <p class="control">
            <input class="input is-medium" type="text" name="content" placeholder="Content" v-model="content">
          </p>
        </div>
        <hr>
        <button v-bind:class="{ 'is-disabled' : this.name === '' && this.author === '' && this.content === '' }" type="button" class="button is-primary" @click="edit">Edit</button>
        <button type="button" class="button is-danger" @click="remove">Remove</button>
        <button type="button" class="button is-danger" @click="exit">Exit</button>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'editForm',
    data: () => ({
      name: '',
      author: '',
      content: '',
      item: [],
    }),
    beforeMount() {
      // eslint-disable-next-line no-underscore-dangle
      this.http.get(`/items/${this.$route.params._id}`)
        .then((res) => {
          this.item = res.data;
        });
    },
    methods: {
      edit() {
        const data = {};
        if (this.name) data.name = this.name;
        if (this.author) data.author = this.author;
        if (this.content) data.content = this.content;
        if (data !== {}) {
          this.http.put(`/items/${this.$route.params._id}`, data)
            .then(() => this.$router.push({ name: 'items.list' }))
            .catch(err => console.log(err));
        }
      },
      remove(_id) {
        this.http.delete(`/items/${this.$route.params._id}`)
          .then(() => this.$router.push({ name: 'items.list'}))
          .catch(err => console.log(err));
      },
      exit() {
        this.$router.push({ name: 'items.list' });
      },
    },
  };
</script>
