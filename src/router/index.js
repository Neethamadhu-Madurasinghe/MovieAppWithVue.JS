import { createRouter, createWebHistory } from 'vue-router'
import { toNumber } from '@vue/shared'

const routes = [
    { path: '/', component: () => import('@/views/IndexView.vue') },
    {
        path: '/discover',
        name: 'discover',
        component: () => import('@/views/DiscoverView.vue'),
        props: route => ({page: toNumber(route.query.page)})
    },
    {
        path: '/movie/:id',
        name: 'movieDetails',
        component: () => import('@/views/MovieDetail.vue'),
        props: route => ({id: toNumber(route.params.id)}),
        children: [
            {
                path: 'images',
                component: () => import('@/components/PosterContainer.vue')
            }
           
        ]
    },
    {
        path: '/common/:title',
        name: 'commonMovieInfo',
        component: () => import('@/views/MoreView.vue'),
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
        component: () => import('@/views/NotFound.vue')
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
