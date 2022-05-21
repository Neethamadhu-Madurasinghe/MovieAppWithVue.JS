<template>
    <div class="main">
            <h1 class="main-heading">Discover</h1>
            <div class="controlable-page-content-area">

                <div class="control-container">
                    <!-- Sorting part -->
                    <ControllerItem>
                        <template #title>Sort</template>

                        <div class="input-section">
                            <div class="control-body">
                                <label for="sortBy">Filter Results by</label>
                                <select v-model="sortBy" name="sortBy" class="filter-input">
                                    <option
                                        v-for="option in options"
                                        :value="option.value"
                                        :key="option.value"
                                    >
                                        {{option.text}}
                                    </option>
                                </select>
                            </div>
                        </div>

                    </ControllerItem>

                    <!-- Filtering part -->
                    <ControllerItem>
                        <template #title>Filters</template>

                        <div class="input-section">
                            <div class="control-body">
                                <label>Release Date</label>
                                <p for="releaseFrom">From</p>
                                <input v-model="dateFrom" type="date" name="releaseFrom" class="filter-input">

                                 <p for="releaseTo">To</p>
                                <input v-model="dateTo" type="date" name="releaseTo" class="filter-input">
                            </div>
                        </div>

                        <div class="input-section">
                            <div class="control-body">
                                <label>Genre</label>
                                <div class="filter-input">
                                    <span
                                        v-for="genre in genresList.genres"
                                        :key="genre.id"
                                        :data-id="genre.id"
                                        @click="addRemoveGenre"
                                        class="genre-toast genre-toast-interactive"
                                    >
                                    {{genre.name}}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="input-section">
                            <div class="control-body">
                                <label>Rating</label>

                                <p for="releaseFrom">Minimum: {{minVote}}</p>
                                <input
                                    v-model="minVote"
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="0.1"
                                    class="filter-input slider"
                                >

                                <p for="releaseFrom">Maximum: {{maxVote}}</p>

                                <input
                                    v-model="maxVote"
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="0.1"
                                    class="filter-input slider"
                                >
                            </div>
                        </div>

                    </ControllerItem>

                    <button @click="searchByButton" class="search-btn">Search</button>

                </div>
                
                <div class="card-part">
                        <div class="card-container">
                        <!-- Cards goes here -->
                         <TransitionGroup
                            tag="div"
                            class="trending-container"
                            @before-enter="beforeEnter"
                            @enter="onEnter"
                        >
                            <CommonCard
                                v-for="movie in movieData.results"
                                :key="movie.id"
                                :movie="movie"
                            ></CommonCard>

                        </TransitionGroup>

                        <!-- <CommonCard
                            v-for="movie in movieData.results"
                            :key="movie.id"
                            :movie="movie"
                        ></CommonCard> -->
                    </div>


                    <!-- Navigation goes here -->
                    <PageNavigation
                        v-if="typeof movieData.page == 'number'"
                        :startValue="1"
                        :endValue="movieData.total_pages < 500 ? movieData.total_pages: 500"
                        :currentValue="movieData.page"
                        >
                    </PageNavigation>
                </div>

            </div>
        </div>
</template>

<script>
import { defineComponent } from "vue"
import gsap from 'gsap'
import ControllerItem from "@/components/ControllerItem.vue"
import CommonCard from "@/components/CommonCard.vue"
import PageNavigation from "@/components/PageNavigation.vue"
import { toNumber } from "@vue/shared"

export default defineComponent({
    components: { ControllerItem, CommonCard, CommonCard, PageNavigation },
    props: {
        page: {
            type: Number,
            required: true,
            default: 1
        }
    },

    data() {
        return {
            options: [
                {value: 'popularity.asc', text: 'Popularity: Ascending'},
                {value: 'popularity.desc', text: 'Popularity: Descending'},
                {value: 'release_date.asc', text: 'Release Date: Ascending'},
                {value: 'release_date.desc', text: 'Release Date: Descending'},
                {value: 'vote_average.asc', text: 'Rating: Ascending'},
                {value: 'vote_average.desc', text: 'Rating: Descending'},

            ],
            sortBy: 'popularity.desc',
            dateFrom: '',
            dateTo: '',
            genresList: [],
            genres: [],
            minVote: 1,
            maxVote: 9.9,
            movieData: []
        }
    },

    methods: {
        addRemoveGenre(el) {
            if(!this.genres.some(genre => genre == toNumber(el.target.dataset.id))){
                this.genres.push(toNumber(el.target.dataset.id))
            }else{
                this.genres.splice(this.genres.indexOf(toNumber(el.target.dataset.id)), 1)
            }
           
            el.target.classList.toggle('genre-toast-selected')
        },

        async search() {
            let searchQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${this.KEY}&language=en-US&include_adult=false&include_video=false&page=${this.page}&with_watch_monetization_types=flatrate`
            // this.movieData = []
            searchQuery += `&sort_by=${this.sortBy}&vote_average.gte=${this.minVote}&vote_average.lte=${this.maxVote}`

            if(this.dateFrom != ''){
                searchQuery += `&release_date.gte=${this.dateFrom}`
            }

            if(this.dateTo != ''){
                searchQuery += `&release_date.lte=${this.dateTo}`
            }

            if(this.genres.length > 0){
                let genreQuery = '&with_genres='
                this.genres.forEach(genre => {
                    genreQuery += genre + ','
                })
                searchQuery += genreQuery
            }
            
            try {
                const response = await fetch(searchQuery)
                this.movieData = await response.json()
                
            }catch(err){
                console.error('Error: ', err)

            }finally{
                // console.log(searchQuery)
            }
            

        },

        async searchByButton() {
            this.$router.push({ path: '/discover', query: { page: 1 } })
            this.search()
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

    watch: {
        async page() {
            await this.search()
        }     
    },

    async created() {
        try {
            const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.KEY}&language=en-US`)
            this.genresList = await genreResponse.json()
            await this.search()
        }catch(err) {
            console.error("Error: ", err)
        }
        
    }
}) 
</script>
