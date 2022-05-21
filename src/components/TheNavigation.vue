<template>
    <div class="nav-bar">
        <div class="logo-container">
            <router-link to="/" class="logo">MOVIE</router-link>
         </div>
            
        <div class="nav-menu">
            <router-link :to="{ name: 'commonMovieInfo', params: {title: 'popular'}, query: {page: 1} }" class=menu-item>
                <div class="menu-title">Popular</div>
            </router-link>

            <router-link :to="{ name: 'discover', query: {page: 1} }" class=menu-item>
                <div class="menu-title">Discover</div>
            </router-link>
            
            <div class="menu-item" id="menu-more" @click="toggleShowMore">
                <div class="menu-title">More</div>
                <Transition name="fade">
                    <div v-show="showMore" class="more-menu-item-container">
                        <router-link :to="{ name: 'commonMovieInfo', params: {title: 'top_rated'}, query: {page: 1} }" class="more-menu-item">Top Rated</router-link>
                        <router-link :to="{ name: 'commonMovieInfo', params: {title: 'now_playing'}, query: {page: 1} }" class="more-menu-item">Now Playing</router-link>
                        <router-link :to="{ name: 'commonMovieInfo', params: {title: 'upcoming'}, query: {page: 1} }" class="more-menu-item">Upcoming</router-link>
                    </div>
                </Transition>
            </div>
        </div>

        <div class="search-section">
            <input class="search-box" type="text" name="search" placeholder="Search" v-model="searchValue" @keypress.enter="searchMovie">
        </div>

            
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        showMore: {
            type: Boolean,
            required: true,
            default: false
        },

        toggleShowMore: {
            type: Function,
            required: true
        }
    },

    data() {
        return {
            searchValue: ''
        }
    },

    methods:{
        searchMovie() {
            if(this.searchValue == '') return
            this.searchValue = this.searchValue.trim()
            this.$router.push({
                name: 'commonMovieInfo',
                params: { title: 'search' },
                query: { search: this.searchValue, page:1}
                })
            this.searchValue = ''
        }
    }
})
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.05s linear;
}

</style>