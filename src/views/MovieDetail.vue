<template>
    <div class="main">
            <div class="summary">
                <!-- <div
                    v-if="imageData.posters != undefined && imageData.posters.length > 0"
                    class="image-container"
                    :style="`background-image:url('${movieImage}')`"
                    >
                </div> -->
                <img :src="movieImage" alt="Image not found" class="image-container">

                <div class="text-container">

                    <h1 v-if="typeof (movieData.release_date) == 'string'">{{movieData.title}} {{movieData.release_date.slice(0, 4)}}</h1>
                    <p>{{movieData.release_date}} 
                        <ul class="comma-list">
                            <li v-for="genre in movieData.genres" :key="genre.id">{{genre.name}}</li>
                        </ul>
                    </p>

                    <!-- <p>{{movieData.release_date}} <span v-for="(genre, index) in movieData.genres" :key="genre.id"><span v-if="index != 0">, </span>{{genre.name}}</span></p> -->
                    
                    <div v-if="typeof movieData.vote_average == 'number'" class="movie-summary-rating">{{movieData.vote_average}}</div>

                    <span v-if="movieData.tagline" class="tagline">{{movieData.tagline}}</span>

                    <h3>Overview</h3>
                    <p>{{movieData.overview}}</p>

                    <h3 v-if="director != false">{{director}}</h3>
                    <p v-if="director != false">Director</p>

                    <h3 v-if="writer != false">{{writer}}</h3>
                    <p v-if="writer != false">Writer</p>

                    <h3 v-if="story != false">{{story}}</h3>
                    <p v-if="story != false">Story</p>
                    
                </div>
            </div>

            <div class="additional-data">
                <div class="actors-and-media">
                    <h1>Cast </h1>
                    <div class="actors-container">
                        <!-- Actor Cards -->
                        <div v-for="actor in castData" :key="actor.id">
                            <ActorCard
                                v-if="typeof actor.id == 'number'"
                                :actor="actor"
                            >
                            </ActorCard>
                        </div>
                    </div>
                    <hr/>

                    <h1>Media</h1>
                    <div class="media">
                        <div class="media-nav">
                            <div class="media-menu-item media-active-tab" @click="changeToImages">Images</div>
                            <div class="media-menu-item" @click="changeToVideos">Videos</div>
                        </div>

                        <div class="media-container">
                            <Transition name="fade" mode="out-in">
                                <!-- <component :is="PosterContainer" :images="imageData"></component> -->
                                <PosterContainer v-show="imageVideo == 'PosterContainer'" :images="imageData"></PosterContainer>
                            </Transition>

                            

                            <Transition name="fade" mode="out-in">
                                <VideoContainer v-show="imageVideo == 'VideoContainer'" :videos="videoData"></VideoContainer>
                            </Transition>
                            
                        </div>
                    </div>
                </div>

                <div class="less-info">
                    <h3>Status</h3>
                    <p>{{movieData.status}}</p>

                    <h3>Original Language</h3>
                    <p>{{movieData.original_language}}</p>

                    <h3>Budget</h3>
                    <p>{{budget}} $</p>

                    <h3>Revenue</h3>
                    <p>{{revenue}} $</p>

                    <h3>Keywords</h3>
                    <div class="keyword-container">
                        <genre-toast v-for="keyword in keywordData" :key="keyword.id">{{keyword.name}}</genre-toast>
                    </div>

                </div>

            </div>
           
        </div>
        <!-- <keep-alive>
                                <component :is="imageVideo" :images="imageData" :videos="videoData"></component>
                            </keep-alive> -->
                            <!-- <PosterContainer v-show="imageVideo == 'PosterContainer'" :images="imageData"></PosterContainer> -->
                            <!-- <VideoContainer v-show="imageVideo == 'VideoContainer'" :videos="videoData"></VideoContainer> -->
</template>

<script>
import { defineComponent } from "vue"
import ActorCard from "@/components/ActorCard.vue"
import GenreToast from "@/components/GenreToast.vue"
import PosterContainer from '@/components/PosterContainer.vue'
import VideoContainer from '@/components/VideoContainer.vue'

export default defineComponent({
    components: { ActorCard, GenreToast, PosterContainer, VideoContainer },
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            imageVideo: 'PosterContainer',
            movieData: {},
            imageData: {},
            videoData: {},
            crewData: undefined,
            castData: [],
            keywordData: [{id: 1, name: 'fdfd'}]
        };
    },
    methods: {
        async getData() {
            let movieQuery = `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.KEY}&language=en-US`;
            let imageQuery = `https://api.themoviedb.org/3/movie/${this.id}/images?api_key=${this.KEY}`;
            let creditsQuery = `https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=${this.KEY}&language=en-US`;
            let keywordQuery = `https://api.themoviedb.org/3/movie/${this.id}/keywords?api_key=${this.KEY}`
            let videoQuery = `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${this.KEY}&language=en-US`

            try {
                let response = await fetch(movieQuery);
                this.movieData = await response.json();

                response = await fetch(imageQuery);
                this.imageData = await response.json();

                response = await fetch(videoQuery);
                this.videoData = await response.json();

                response = await fetch(keywordQuery);
                let temp = await response.json();
                this.keywordData = temp.keywords
                
                response = await fetch(creditsQuery);
                temp = await response.json();
                this.castData = temp.cast;
                this.crewData = temp.crew;
            }catch(err) {
                console.error('Error: ', err)
            }
    
        },

        // To format numbers (eg: 1500000 => 1 500 000)
        formattedValues(value) {
            let formattedValue = ''

            if (value == 0) {
                formattedValue = '0'
            } else {
                while (value > 1000) {
                    let rem = value % 1000
                    if (value / 1000 > 1) {
                        value = Math.floor(value / 1000)
                    } else {
                        value = value / 1000;
                    }

                    if (value > 0 && rem === 0) {
                        let temp = '000'
                        formattedValue = temp + ' ' + formattedValue
                    } else {
                        if (value >= 1 && rem < 100) {
                            let temp = String(rem)
                            formattedValue = '0' + temp + ' ' + formattedValue
                        } else {
                            let temp = String(rem)
                            formattedValue = temp + ' ' + formattedValue
                        }
                    }
                }

                if (value > 0) {
                    let temp = String(value)
                    formattedValue = temp + ' ' + formattedValue;
                }
            }
            return formattedValue;
        },

        changeToImages(e) {
            Array.from(document.querySelectorAll('.media-menu-item')).forEach(mediaTab => mediaTab.classList.remove('media-active-tab'))
            e.target.classList.add('media-active-tab')
            this.imageVideo='PosterContainer'
        },

        changeToVideos(e) {
            Array.from(document.querySelectorAll('.media-menu-item')).forEach(mediaTab => mediaTab.classList.remove('media-active-tab'))
            e.target.classList.add('media-active-tab')
            this.imageVideo='VideoContainer'
        }
    },
    async created() {
        this.getData();
    },

    computed: {
        budget() {
            return this.formattedValues(this.movieData.budget)
        },

        revenue() {
            return this.formattedValues(this.movieData.revenue)
        },

        writer() {
            return this.crewData != undefined && this.crewData.find(crewMember => crewMember.job === 'Writer') != undefined ? this.crewData.find(crewMember => crewMember.job == 'Writer').name : false
        },

        director() {
            return this.crewData != undefined && this.crewData.find(crewMember => crewMember.job === 'Director') != undefined ? this.crewData.find(crewMember => crewMember.job == 'Director').name : false
        },

        story() {
            return this.crewData != undefined && this.crewData.find(crewMember => crewMember.job === 'Story') != undefined ? this.crewData.find(crewMember => crewMember.job == 'Story').name : false
        },

        movieImage() {
            return this.imageData != undefined && this.imageData.posters != undefined && this.imageData.posters.length > 0 ? 
                `https://image.tmdb.org/t/p/w500/${this.imageData.posters[0].file_path}` : 'https://advancement.uccs.edu/sites/g/files/kjihxj1886/files/2022-01/person.jpg'
        }
    }
})

</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s linear;
}
</style>