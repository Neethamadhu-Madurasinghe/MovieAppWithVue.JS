import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import PosterContainer from '@/components/PosterContainer.vue'
import MoreView from '@/views/MoreView.vue'
import NotFound from '@/views/NotFound.vue'
import { toNumber } from '@vue/shared'

const routes = [
    { path: '/', component: IndexView },
    {
        path: '/discover',
        name: 'discover',
        component: DiscoverView,
        props: route => ({page: toNumber(route.query.page)})
    },
    {
        path: '/movie/:id',
        name: 'movieDetails',
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
        path: '/common/:title',
        name: 'commonMovieInfo',
        component: MoreView,
        props: route => ({title: route.params.title, page: toNumber(route.query.page), searchWord: route.query.search}),
        beforeEnter: (to, from) => {
            const paths = [ '/common/popular', '/common/top_rated', '/common/now_playing', '/common/upcoming', /common\/search/]
            if(paths.some(path => (path === to.path) || (path instanceof RegExp  && path.test(to.path)))) return true
            else return { name: 'NotFound' }
        }
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){
        return new Promise(resolve => {
            setTimeout(() => resolve({ top: 0, behavior: 'smooth' }), 400)
        })
       
    }
})


export default router
