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
                                <label for="sort">Filter Results by</label>
                                <br>
                                <select v-model="sortBy" name="sort" class="filter-input">Select filter>
                                    <option v-for="option in options" :value="option.value" :key="option.value">{{option.text}}</option>
                                </select>
                            </div>

                        </div>

                    </ControllerItem>

                    <!-- Filtering part -->
                    <ControllerItem>
                        <template #title>Filters</template>

                        <div class="input-section">
                            <div class="control-body">
                                <label>Release Day</label>
                                <br>
                                <p for="releaseFrom">From</p>
                                <input v-model="dateFrom" type="date" name="releaseFrom" class="filter-input">

                                 <p for="releaseTo">To</p>
                                <input v-model="dateTo" type="date" name="releaseTo" class="filter-input">
                            </div>
                        </div>

                        <div class="input-section">
                            <div class="control-body">
                                <label>Genre</label>
                                <br>
                                <div class="filter-input">
                                    <span
                                        v-for="genre in genresList.genres"
                                        :key="genre.id"
                                        class="genre-toast genre-toast-interactive"
                                        :data-id="genre.id"
                                        @click="addRemoveGenre"
                                    >
                                    {{genre.name}}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="input-section">
                            <div class="control-body">
                                <label>Rating</label>
                                <br>
                                <p for="releaseFrom">Minimum: {{minVote}}</p>
                                <input v-model="minVote" type="range" min="1" max="10" step="0.1" class="filter-input slider">

                                <p for="releaseFrom">Maximum: {{maxVote}}</p>
                                <input v-model="maxVote" type="range" min="1" max="10" step="0.1" class="filter-input slider">
                            </div>
                        </div>

                    </ControllerItem>

                    <button @click="searchByButton" class="search-btn">Search</button>

                </div>
                <div class="card-part">

                     <div class="card-container">
                        <!-- Cards goes here -->
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
            movieData: [],
            q: ''
        }
    },

    async created() {
        this.search()
        const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.KEY}&language=en-US`)
        this.genresList = await genreResponse.json()
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
            let query = `https://api.themoviedb.org/3/discover/movie?api_key=${this.KEY}&language=en-US&include_adult=false&include_video=false&page=${this.page}&with_watch_monetization_types=flatrate`
            this.movieData = []
            query += `&sort_by=${this.sortBy}&vote_average.gte=${this.minVote}&vote_average.lte=${this.maxVote}`

            if(this.dateFrom != ''){
                query += `&release_date.gte=${this.dateFrom}`
            }

            if(this.dateFrom != ''){
                query += `&release_date.lte=${this.dateTo}`
            }

            if(this.genres.length > 0){
                let genreQuery = '&with_genres='
                this.genres.forEach(genre => {
                    genreQuery += genre + ','
                })

                query += genreQuery
            }
            

            const response = await fetch(query)
            this.movieData = await response.json()
            console.log(this.page, this.movieData)
        },

        async searchByButton() {
            this.$router.push({ path: '/discover', query: { page: 1 } })
            this.search()
        }
    },
    watch: {
        page() {
            this.search()
        }     
    }
}) 
</script>