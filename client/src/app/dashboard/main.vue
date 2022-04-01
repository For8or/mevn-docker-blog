<template>
  <div class="column">
    <section class="section">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Users</p>
              <p class="title">{{ users }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Items</p>
              <p class="title">{{ items }}</p>
            </div>
          </div>
        </nav>
        <hr>
      </div>
    </section>
    <section class="section">
        <h1 class="title">Recent posts</h1>
      <pagination
        :data="recentItems"
        :total-pages="Math.ceil(recentItems.length / 10)"
        :total="recentItems.length"
        :per-page="10"
        :current-page="currentPage"
        @pagechanged="onPageChange"
      />
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import pagination from "./components/pagination";

export default {
    name: 'dashboard',
    data: () => ({
      users: 0,
      items: 0,
      page: 1,
      total: 0,
      recentItems: [],
      dateNow: new Date(),
      currentPage: 1,
    }),
    beforeMount() {
      this.http.get('/info')
        .then((res) => {
          this.users = res.data.userCount;
          this.items = res.data.itemsCount;
          res.data.recentes.forEach((item) => {
            const itemDate = new Date(item.created_at);
            const seconds = this.dateNow.getTime()/1000 - itemDate.getTime()/1000;
            item.seconds = Math.floor(seconds);
          });
          this.recentItems = res.data.recentes;
        })
        .catch(err => console.log(err));
    },
    methods:{
      onPageChange(page) {
        this.currentPage = page;
      },
    },
    components: {
      pagination
    }
  };
</script>
