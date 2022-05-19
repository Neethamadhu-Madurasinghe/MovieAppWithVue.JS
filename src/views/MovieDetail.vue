<template>
    <div class="main">
            <div class="summary">
                <div v-if="typeof imageData.posters == 'object'" class="image-container" :style="`background-image:url('https://image.tmdb.org/t/p/w500/${imageData.posters[0].file_path}')`"></div>
                <div class="text-container">
                    <h1 v-if="typeof (movieData.release_date) == 'string'">{{movieData.title}} {{movieData.release_date.slice(0, 4)}}</h1>
                    <p>{{movieData.release_date}} <span v-for="(genre, index) in movieData.genres" :key="genre.id"><span v-if="index != 0">, </span>{{genre.name}}</span></p>

                    <span class="tagline">{{movieData.tagline}}</span>

                    <h3>Overview</h3>
                    <p>{{movieData.overview}}</p>

                    <h3 v-if="typeof crewData == 'object'">{{crewData.find(crewMember => crewMember.job == 'Director').name}}</h3>
                    <p>Director</p>

                    <h3>Hello</h3>
                    <p>Director, Writer</p>
                </div>
            </div>

            <div class="additional-data">
                <div class="actors-and-media">
                    <h1>Cast </h1>
                    <div class="actors-container">
                        <!-- Actor Cards -->
                        <div v-for="actor in castData" :key="actor.id">
                            <ActorCard v-if="typeof actor.id != 'string'" :actor="actor"></ActorCard>
                        </div>
                        

                    </div>
                    <hr/>

                    <h1>Media </h1>
                    <div class="media">
                        <div class="media-nav">
                            <div class="media-menu-item media-activet-tab" @click="imageVideo='PosterContainer'">Images</div>
                            <div class="media-menu-item" @click="imageVideo='VideoContainer'">Videos</div>
                        </div>

                        <div class="media-container">
                            <keep-alive>
                                <component :is="imageVideo" :images="imageData" :videos="videoData"></component>
                            </keep-alive>
                            <!-- <PosterContainer v-if="imageVideo == 'PosterContainer'" :images="imageData"></PosterContainer>
                            <VideoContainer v-else :videos="videoData"></VideoContainer> -->

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
</template>

<script>
import { defineComponent } from "vue"
import ActorCard from "@/components/ActorCard.vue"
import GenreToast from "@/components/GenreToast.vue"
import PosterContainer from '@/components/PosterContainer.vue'
import VideoContainer from '@/components/VideoContainer.vue'

export default defineComponent({
    components: { ActorCard, GenreToast, PosterContainer, VideoContainer, PosterContainer, VideoContainer },
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

            console.log(this.videoData);
        },

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

        changeToImages() {
            document.querySelector('.media-menu-item').classList.remove
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
        }
    }
})

</script>