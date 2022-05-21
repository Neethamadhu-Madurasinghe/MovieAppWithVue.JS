<template>
    <div>
        <div class="common-card">
    
        <router-link :to="{ name:'movieDetails', params: {id: movie.id} }">
            <img :src="imagePath" alt="Image not found" class="image-area common-image-area">
            <!-- <div class="image-area common-image-area" :style="`background-image:url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`"></div> -->
            <div class="rating-container">
                {{movie.vote_average}}
            </div>
        
            <div class="detail-area common-detail-area">
                <p>{{movie.original_title}}</p>
                <span>{{movie.release_date}}</span>
            </div>
        </router-link>

        </div>
        
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        movie: {
            type: Object,
            required: true,
            default: {}
        }
    },

    computed: {
        imagePath() {
            return this.movie.poster_path != undefined ? `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}` : 'https://advancement.uccs.edu/sites/g/files/kjihxj1886/files/2022-01/person.jpg'
        }
    }
})
</script>