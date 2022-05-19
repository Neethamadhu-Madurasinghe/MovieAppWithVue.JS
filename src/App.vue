<script>
import { defineComponent } from 'vue';
import TheNavigation from './components/TheNavigation.vue';

export default defineComponent({
    components: { TheNavigation },
    data() {
      return {
        showMore: false
      }
    },

    methods: {
      toggleShowMore() {
        this.showMore = !this.showMore
      },

      hideMore() {
        this.showMore = false
      }
    }
})

</script>

<template>
  <TheNavigation :toggleShowMore="toggleShowMore" :showMore="showMore"></TheNavigation>
  <router-view :key="$route.path" @click="hideMore"></router-view>
</template>


