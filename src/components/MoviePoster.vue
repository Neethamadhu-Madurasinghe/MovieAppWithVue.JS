<template>
    <div class="poster-container">
        <img :src="`https://image.tmdb.org/t/p/w500/${image}`" alt="Image is not avaible" class="poster">
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        image: {
            type: String,
            required: true
        }
    }
})
</script>