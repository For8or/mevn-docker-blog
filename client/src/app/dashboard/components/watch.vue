<template>
  <div class="column is-7">
    <div>
      <p class="title">{{item.name}}</p>
      <p class="heading">{{item.author}}</p>
      <p class="content">{{item.content}}</p>
      <p class="is-small level-right">{{item.created_at}}</p>
    </div>
    <div class="level-right">
      <div class="level-item">
        <button class="button is-primary " @click="exit()">Exit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'watch',
  data: () => ({
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
    exit() {
      this.$router.push({ name: 'dashboard' });
    },
  },
};
</script>
