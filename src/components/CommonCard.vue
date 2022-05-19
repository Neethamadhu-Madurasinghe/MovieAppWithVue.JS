<template>
    <div class="common-card">
        <router-link :to="`/movie/${movie.id}`">
            <div class="image-area common-image-area" :style="`background-image:url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`"></div>
            <div class="rating-container">
                {{movie.vote_average}}
            </div>
        
            <div class="detail-area common-detail-area">
                <p>{{movie.original_title}}</p>
                <span>{{movie.release_date}}</span>
            </div>
        </router-link>
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
    }
})
</script>