<template>
    <div>
         <div class="trending-card">

        <router-link :to="{ name: 'movieDetails', params: {id: movie.id} }">
            <img :src="imagePath" alt="Image not found" class="image-area">
            <!-- <div class="image-area" :style="`background-image:url('https://image.tmdb.org/t/p/w500/${movie.imageUrl}')`"></div> -->
            <div class="detail-area">
                <genre-toast v-for="genre in movie.genres.slice(0, 4)" :key="genre?.id">{{genre?.name}}</genre-toast>       
            </div>
        </router-link>

        </div>
        
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
    },

    computed: {
        imagePath() {
            return this.movie.imageUrl != undefined ? `https://image.tmdb.org/t/p/w500/${this.movie.imageUrl}` : 'https://advancement.uccs.edu/sites/g/files/kjihxj1886/files/2022-01/person.jpg'
        }
    }
})

</script>