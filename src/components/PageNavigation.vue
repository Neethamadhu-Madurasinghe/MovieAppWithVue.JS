<template>
    <div class="content-page-navigation">

        <span class="page-nav nav-pre" v-if="currentValue != startValue" @click="toPrevious">Previous</span>

        <span class="page-nav" v-if="currentValue > startValue + 1" @click="toStart">{{startValue}}</span>

        <span v-if="currentValue > startValue + 1">....</span>

        <span class="page-nav" v-if="currentValue != startValue" @click="toNumber">{{currentValue - 1}}</span>

        <span class="page-nav">{{currentValue}}</span>

        <span class="page-nav" v-if="currentValue != endValue" @click="toNumber">{{currentValue + 1}}</span>

        <span v-if="currentValue != endValue">....</span>

        <span class="page-nav nav-last" v-if="currentValue != endValue" @click="toEnd">{{endValue}}</span>

        <span class="page-nav nav-next" v-if="currentValue != endValue" @click="toNext">Next</span>

    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        startValue: {
            type: Number,
            required: true,
            default: 1
        },

        endValue: {
            type: Number,
            required: true
        },

        currentValue: {
            type: Number,
            required: true
        }
    },

    methods: {
        toPrevious() {
            console.log(this.$route.path)
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: this.currentValue - 1 } })
        },

        toNext() {
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: this.currentValue + 1 } })
        },

        toStart() {
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: 1 } })
        },

        toEnd() {
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: this.endValue } })
        },

        toNumber(el) {
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page: el.target.textContent } })
        }
    }

})
</script>