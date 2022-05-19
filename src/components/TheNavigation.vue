<template>
    <div class="nav-bar">
        <div class="logo-container">
            <router-link to="/" class="logo">MOVIE</router-link>
         </div>
            
        <div class="nav-menu">
            <router-link to="/popular?page=1" class=menu-item>Popular</router-link>
            <router-link to="/discover?page=1" class=menu-item>Discover</router-link>
            <div class="menu-item" id="menu-more" @click="toggleShowMore">More
                <div v-show="showMore" class="more-menu-item-container">
                    <router-link to="/top_rated?page=1" class="more-menu-item">Top Rated</router-link>
                    <router-link to="/now_playing?page=1" class="more-menu-item">Now Playing</router-link>
                    <router-link to="/upcoming?page=1" class="more-menu-item">Upcoming</router-link>
                </div>
            </div>

             <div class="search-section">
                <input class="search-box" type="text" name="search" placeholder="Search Movie" v-model="searchValue" @keypress.enter="searchMovie">
            </div>


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
                path: '/search',
                query: { word: this.searchValue, page:1 }
                })
        }
    }
})
</script>