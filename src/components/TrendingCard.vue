<template>
    <div class="trending-card">
        <router-link :to="`/movie/${movie.id}`">
            <div class="image-area" :style="`background-image:url('https://image.tmdb.org/t/p/w500/${movie.imageUrl}')`"></div>
            <div class="detail-area">
                <genre-toast v-for="genre in movie.genres" :key="genre.id">{{genre.name}}</genre-toast>       
            </div>
        </router-link>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import GenreToast from "./GenreToast.vue"

export default defineComponent({
    components: { GenreToast, GenreToast },
    props: {
        movie: {
            type: Object,
            required: true,
            default: {movieId: 0, imageUrl: undefined, genres: []}
        }
    }
})
</script>