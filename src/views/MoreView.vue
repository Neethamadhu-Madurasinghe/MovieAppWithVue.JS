<template>
    <div class="main">
        
        <h1 class="main-heading">{{title}}</h1>
        <div class="controlable-page-content-area">
            <div class="card-container full-width-container">

                <div class="more-card-part">
                    <!-- Cards go here -->
                    <CommonCard
                        v-for="movie in movieData.results"
                        :key="movie.id"
                        :movie="movie"
                    ></CommonCard>
                    
                </div>

                <!-- Navigation goes here -->
                
                <PageNavigation v-if="typeof movieData.page == 'number'" :startValue="1" :endValue="movieData.total_pages < 500 ? movieData.total_pages: 500" :currentValue="movieData.page">
                </PageNavigation>

            </div>
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from "vue"
import CommonCard from "@/components/CommonCard.vue"
import PageNavigation from "@/components/PageNavigation.vue"

export default defineComponent({
    components: {CommonCard, PageNavigation },
    props: {
        title: {
            type: String,
            required: true
        },

        word: {
            type: String,
            required: true
        },
        page: {
            type: Number,
            required: true,
            default: 1
        }
    },
    data() {
        return {
            movieData: {}
        }
    },

    async created() {
        this.search()
    },
    watch: {
        async page() {
            this.search()
        },
        async word() {
            this.search()
        }   
    },

    methods: {
        async search() {
            let movieQuery
            if(this.title != 'search'){
                movieQuery = `https://api.themoviedb.org/3/movie/${this.title}?api_key=${this.KEY}&language=en-US&page=${this.page}`;
            }else {
                movieQuery = `https://api.themoviedb.org/3/search/movie?api_key=${this.KEY}&language=en-US&query=${this.$route.query.word}&page=${this.page}&include_adult=false`
            }
        
            
            let response = await fetch(movieQuery);
            this.movieData = await response.json();


            console.log(this.movieData)
        }
    }
})
</script>