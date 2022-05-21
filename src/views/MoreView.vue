<template>
    <div class="main">
        
        <h1 class="main-heading">{{heading}}</h1>
        <div class="card-container full-width-container">

                    <!-- Cards go here -->
                    <TransitionGroup
                            tag="div"
                            class="more-card-part"
                            @before-enter="beforeEnter"
                            @enter="onEnter"
                        >
                            <CommonCard
                                v-for="movie in movieData.results"
                                :key="movie.id"
                                :movie="movie"
                            ></CommonCard>

                    </TransitionGroup>

                <!-- Navigation goes here -->
                
                <PageNavigation
                    v-if="typeof movieData.page == 'number'"
                    :startValue="1" :endValue="movieData.total_pages < 500 ? movieData.total_pages: 500"
                    :currentValue="movieData.page"
                >
                </PageNavigation>

        </div>
        
    </div>
</template>

<script>
import { defineComponent } from "vue"
import gsap from 'gsap'
import CommonCard from "@/components/CommonCard.vue"
import PageNavigation from "@/components/PageNavigation.vue"

export default defineComponent({
    components: {CommonCard, PageNavigation },
    props: {
        title: {
            type: String,
            required: true,
            default: 'No Title'
        },

        searchWord: {
            type: String,
            required: false
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
        async searchWord() {
            this.search()
        }   
    },

    methods: {
        async search() {
            let movieQuery
            if(this.title != 'search'){
                movieQuery = `https://api.themoviedb.org/3/movie/${this.title}?api_key=${this.KEY}&language=en-US&page=${this.page}`;
            }else {
                movieQuery = `https://api.themoviedb.org/3/search/movie?api_key=${this.KEY}&language=en-US&query=${this.searchWord}&page=${this.page}&include_adult=false`
            }
        
            
            let response = await fetch(movieQuery);
            this.movieData = await response.json();

        },

        beforeEnter(el) {
            el.style.opacity = 0
            el.style.transform = 'scale(0.7)'
        },

        onEnter(el, done) {
            gsap.to(el, {
                scale: 1,
                opacity: 1,
                duration: .1,
                onComplete: done

            })
        }
    },

    computed: {
        heading() {
            const headings = {
                popular: 'Popular',
                top_rated: 'Top Rated',
                now_playing: 'Now Playing',
                upcoming: 'Upcoming',
                search: this.searchWord + ": "+ (this.movieData.total_results != undefined ? this.movieData.total_results : 0) + ' Results Found'
            }

            return headings[this.title]
        }
    }
})
</script>