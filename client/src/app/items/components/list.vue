<template>
  <div class="column is-8">
    <pagination
      :data="itemsList"
      :total-pages="Math.ceil(itemsList.length / 10)"
      :total="itemsList.length"
      :per-page="10"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
    <nav class="level">
      <div class="level-left">
          <div class="level-item">
          </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary" @click="navigate('newitem.form')">New Post</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import pagination from './pagination';

  export default {
    name: 'items-view',
    data: () => ({
      itemsList: [],
      currentPage: 1,
    }),
    beforeMount() {
      this.http.get('/items/list')
        .then((res) => {
          this.itemsList = res.data;
        });
    },
    methods: {
      navigate(index) {
        this.$router.push({ name: index });
      },
      onPageChange(page) {
        this.currentPage = page;
      },
    },
    components: {
      pagination,
    },
  };
</script>
