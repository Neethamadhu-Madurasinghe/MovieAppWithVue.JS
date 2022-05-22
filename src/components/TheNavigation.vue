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

            <div class=menu-item>
                <div class="menu-title" @click="changeColor">Color</div>
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
            searchValue: '',
            currentColorTheme: 0
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
        },

        changeColor() {
            const colors = [
                {
                    '--darker-color': '#402218',
                    '--normal-color': '#865439',
                    '--light-color': '#C68B59',
                    '--lighter-color': '#D7B19D',
                    '--lightest-color': '#FFE4D4'
                },
                {
                    '--darker-color': '#220E24',
                    '--normal-color': '#342056',
                    '--light-color': '#639CD9',
                    '--lighter-color': '#639CD9',
                    '--lightest-color': '#d8e6f7'
                },
                {
                    '--darker-color': '#242F9B',
                    '--normal-color': '#646FD4',
                    '--light-color': '#9BA3EB',
                    '--lighter-color': '#DBDFFD',
                    '--lightest-color': '#d3d4db'
                },
                {
                    '--darker-color': '#191A19',
                    '--normal-color': '#4E9F3D',
                    '--light-color': '#4E9F3D',
                    '--lighter-color': '#D8E9A8',
                    '--lightest-color': '#a7c74e'
                }

                
            ]
            const r = document.querySelector(':root')
            this.currentColorTheme = (this.currentColorTheme + 1) % colors.length

            Object.keys(colors[this.currentColorTheme]).forEach(key => {
                r.style.setProperty(key, colors[this.currentColorTheme][key]);
            })

            
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