<template>
  <div>
    <hr>
    <div class="content">
    <h1>Hello, {{user.name}}, this is your profile! {{this.email}}</h1>
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
    <hr>
    <h1 class="content">User Posts</h1>
    <pagination
      :data="itemsList"
      :total-pages="Math.ceil(itemsList.length / 10)"
      :total="itemsList.length"
      :per-page="10"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
    <hr>
    <div class="level-right">
      <div class="level-item">
        <button class="button is-primary" @click="navigate('newitem.form')">New Post</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import pagination from "../items/components/pagination";

export default {
  name: 'dashboard',
  data: () => ({
    user: [],
    itemsList: [],
    currentPage: 1,
    email: '',
  }),
  computed: {
    ...mapGetters(['getUser']),
  },
  beforeMount() {
    // eslint-disable-next-line no-underscore-dangle
    this.user.email = this.$store.getters.getUser.email
    this.user.name =  this.$store.getters.getUser.name;
    if (this.$store.getters.getUser.isAdmin === true) this.user.accessLevel = 'Admin';
    if (this.$store.getters.getUser.isAdmin === false) this.user.accessLevel = 'User';

    this.http.get(`/items/list/${this.user.name}`)
      .then((res) => {
        this.itemsList = res.data;
      });
  },
  methods:{
    navigate(index) {
      this.$router.push({ name: index });
    },
    edit() {
      this.$router.push({ name: 'users.edit', params: { _id: this.user._id } });
    },
    onPageChange(page) {
      this.currentPage = page;
    },
  },
  components: {
    pagination
  }
};
</script>
