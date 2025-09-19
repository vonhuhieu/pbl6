const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/views/dashboards/default/components/DefaultDashboard.vue')
    },
    {
      name: 'Default',
      path: '/dashboard/default',
      component: () => import('@/views/dashboards/default/components/DefaultDashboard.vue')
    },
    {
      name: 'Bird Orders',
      path: '/pages/birdorders',
      component: () => import('@/views/pages/BirdOrder/BirdOrder.vue')
    },
    {
      name: 'Bird Families',
      path: '/pages/birdorders/:orderId/birdfamily',
      component: () => import('@/views/pages/BirdFamily/BirdFamily.vue')
    },
    {
      name: 'Bird Species',
      path: '/pages/birdorders/:orderId/birdfamily/:familyId/birdspecies',
      component: () => import('@/views/pages/BirdSpecie/BirdSpecie.vue')
    },
    {
      name: 'Bird Specie Detail',
      path: '/pages/birdspecies/details/:specieId',
      component: () => import('@/views/pages/BirdSpecie/BirdSpecieDetail.vue'),
      props: true
    },
    {
      name: 'Bird Images',
      path: '/pages/birdspecies/:specieId/birdimages',
      component: () => import('@/views/pages/BirdImage/BirdImage.vue')
    },
    {
      name: 'Birds',
      path: '/pages/birds',
      component: () => import('@/views/pages/bird/index.vue')
    },
    {
      name: 'Recycle Bin',
      path: '/pages/recycle',
      component: () => import('@/views/pages/recycle/index.vue')
    },
    {
      name: 'Starter',
      path: '/starter',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Tabler Icons',
      path: '/icons/tabler',
      component: () => import('@/views/utilities/icons/TablerIcons.vue')
    },
    {
      name: 'Material Icons',
      path: '/icons/material',
      component: () => import('@/views/utilities/icons/MaterialIcons.vue')
    },
    {
      name: 'Typography',
      path: '/utils/typography',
      component: () => import('@/views/utilities/typography/TypographyPage.vue')
    },
    {
      name: 'Shadows',
      path: '/utils/shadows',
      component: () => import('@/views/utilities/shadows/ShadowPage.vue')
    },
    {
      name: 'Colors',
      path: '/utils/colors',
      component: () => import('@/views/utilities/colors/ColorPage.vue')
    },
    {
      name: "Search",
      path: "/pages/search",
      component: () => import("@/views/pages/search/Search.vue")
    }
  ]
};

export default MainRoutes;
