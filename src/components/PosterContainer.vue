<template>
    <div class="media-sample">
        <MoviePoster v-for="poster in images.posters" :key="poster.file_path" :image="poster.file_path"></MoviePoster>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import MoviePoster from "@/components/MoviePoster.vue"

export default defineComponent({
    components: { MoviePoster },
    props: {
        images: {
            type: Object,
            required: true
        }
    }
})
</script>