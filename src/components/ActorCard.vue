<template>
    <div class="actors-card">
        <img :src="actor.image" alt="Image not found" class="image-area">
        <!-- <div class="image-area" :style="`background-image:url('https://image.tmdb.org/t/p/w500/${actor.image}')`"></div> -->
        <div class="actor-detail-area">
            <p>{{actor.original_name}}</p>
            <span>{{actor.character}}</span>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        actor: {
            type: Object,
            required: true
        }
    },

    async created() {
        try {
            let personQuery = `https://api.themoviedb.org/3/person/${this.actor.id}/images?api_key=${this.KEY}&language=en-US`
            let response = await fetch(personQuery)
            let actorData = await response.json()
            this.actor.image = actorData.profiles[0] != undefined && actorData.profiles[0].file_path != undefined ? `https://image.tmdb.org/t/p/w500/${actorData.profiles[0].file_path}` : 'https://advancement.uccs.edu/sites/g/files/kjihxj1886/files/2022-01/person.jpg'
            // actorData.profiles[0].file_path
        }catch (err) {
            console.error("Error: ", err)
        } 
        

    }
})
</script>