<template>
    <div class="video-container">
        <iframe id="video-player" :src="`https://www.youtube.com/embed/${video}`"></iframe>
    </div>
</template>

<script>
import { defineComponent } from "vue"


export default defineComponent({
    props: {
        video: {
            type: String,
            required: true
        }
    }
})
</script>