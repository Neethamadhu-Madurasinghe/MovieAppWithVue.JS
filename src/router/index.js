import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import PosterContainer from '@/components/PosterContainer.vue'
import MoreView from '@/views/MoreView.vue'
import { toNumber } from '@vue/shared'

const routes = [
    { path: '/', component: IndexView },
    {
        path: '/discover',
        component: DiscoverView,
        props: route => ({page: toNumber(route.query.page)})
    },
    {
        path: '/movie/:id',
        component: MovieDetail,
        props: route => ({id: toNumber(route.params.id)}),
        children: [
            {
                path: 'images',
                component: PosterContainer
            }
           
        ]
    },
    {
        path: '/:title',
        component: MoreView,
        props: route => ({title: route.params.title, page: toNumber(route.query.page), word: route.query.word}),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
