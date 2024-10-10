<template>
  <div>
    <h2>Dashboard</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
  },
  computed: {
    ...mapState(['token']),
  },
  methods: {
  },
};
</script>