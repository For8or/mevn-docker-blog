<template>
  <nav class="nav has-shadow tabs is-large">
    <div class="container">
      <div class="nav-left">
        <p class="nav-item title is-3">
          Portal Manager
        </p>
      </div>
      <div class="nav-right is-link" @click="profile(getUser._id)">
        <a class="nav-item is-tab ">
          <figure class="image is-32x32" style="margin-right: 10px;">
            <img :src="getUser.avatarUrl" style="border-radius: 4px;">
          </figure>
          {{ getUser.name }}
          </a>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex';

export default {
  name: 'navbar',
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    profile(_id) {
      this.$router.push({ name: 'profile', params: { _id } });
    },
  },
};
</script>


<style>
  .nav-item img {
    max-height: 2.3rem;
  }
</style>
