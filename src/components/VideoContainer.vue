<template>
    <div class="media-sample">
        <MovieVideo  v-for="video in videos.results" :key="video.key" :video="video.key"></MovieVideo>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import MovieVideo from "@/components/MovieVideo.vue"

export default defineComponent({
    components: { MovieVideo },
    props: {
        videos: {
            type: Object,
            required: true
        }
    }
})
</script>
