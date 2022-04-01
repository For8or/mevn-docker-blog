<template>
    <div class="">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Content</th>
          <th>Crated at</th>
          <th>Watch</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.content }}</td>
          <td>created {{ item.seconds }} seconds ago</td>
          <td><a class="button is-link" @click="watch(item._id)">Watch</a></td>
        </tr>
        </tbody>
      </table>
      <nav class="level">
        <ul class="columns" v-if="data.length > 10 || currentPage > 1">
          <li class="column" title="Первая страница">
            <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
              <<
            </button>
          </li>

          <li class="column" title="Предыдущая страница">
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
              <
            </button>
          </li>

          <li class="column" v-for="(page, index) in pages" :key="index">
            <button
              type="button"
              @click="onClickPage(page.number)"
              :disabled="page.isDisabled"
              :class="{ active: isPageActive(page.number) }">
              {{ page.number }}
            </button>
          </li>

          <li class="column" title="Следующая страница">
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
              >
            </button>
          </li>
          <li class="column" title="Последняя страница">
            <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
              >>
            </button>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>

export default {
  name: 'pagination',
  props: {
    data: {
      type: Array,
      required: true,
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    paginatedData() {
      // eslint-disable-next-line one-var,prefer-const
      let start = (this.currentPage - 1) * this.perPage,
        // eslint-disable-next-line prefer-const
        end = start + this.perPage;
      return this.data.slice(start, end);
    },
    startPage() {
      if (this.currentPage === 1) return 1;
      // eslint-disable-next-line max-len,no-mixed-operators
      if (this.currentPage === this.totalPages) return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons - 1);
      return this.currentPage - 1;
    },
    // eslint-disable-next-line no-mixed-operators
    endPage() { return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() { return this.currentPage === 1; },
    isInLastPage() { return this.currentPage === this.totalPages; },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    watch(_id) {
      this.$router.push({ name: 'watch', params: { _id } });
    },
  },
};
</script>
