<template>
    <div class="main">

            <h1 class="main-heading">Trending</h1>

            <TransitionGroup
                tag="div"
                class="trending-container"
                @before-enter="beforeEnter"
                @enter="onEnter"
            >
                <TrendingCard
                    v-for="(trendingMovie, index) in trendingMovies"
                    :key="trendingMovie.id"
                    :movie="trendingMovie"
                    :data-index="index"
                ></TrendingCard>

            </TransitionGroup>

        </div>
</template>

<script>
import TrendingCard from "@/components/TrendingCard.vue"
import { defineComponent } from "vue"
import gsap from 'gsap'


export default defineComponent({
    components: { TrendingCard },
    data () {
        return {
            trendingMovies: []
        }
    },

    methods: {
        beforeEnter(el) {
            el.style.opacity = 0
            el.style.transform = 'translateY(100px)'
        },

        onEnter(el, done) {
            gsap.to(el, {
                y: 0,
                opacity: 1,
                duration: .5,
                onComplete: done,
                delay: 0.1 * el.dataset.index,

            })
        }
    },
    async created() {
        const tredningMovieQuery = `https://api.themoviedb.org/3/trending/all/week?api_key=${this.KEY}`
        const grenreQuery = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.KEY}&language=en-US`
        let response = undefined;

        try {
            response = await fetch(tredningMovieQuery)
            const trendingData = await response.json()

            response = await fetch(grenreQuery)
            const genreData = await response.json()

            trendingData.results.slice(0, 5).forEach(movie => {
                let currentMovie = {id: movie.id, imageUrl: movie.poster_path, genres: []}
                movie.genre_ids.forEach(genreId => {
                    currentMovie.genres.push(genreData.genres.find(genre => genre.id == genreId))
                })
                this.trendingMovies.push(currentMovie)
            })

        }catch(err) {
            console.error('Error: ', err)
        }  
    }
})
</script>

<style>
</style>
   