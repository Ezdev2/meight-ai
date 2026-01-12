import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/LandingView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/campaign/:id',
    name: 'CampaignDetail',
    component: () => import('../views/CampaignDetailView.vue')
  },
  {
    path: '/candidate/:id',
    name: 'CandidateAnalysis',
    component: () => import('../views/CandidateAnalysisView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
