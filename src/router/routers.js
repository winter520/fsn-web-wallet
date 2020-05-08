const Main = resolve => require.ensure([], () => resolve(require('@c/Main/index.vue')) )
export default [
  // {
  //   path: '/',
  //   component: Main,
  //   children: [
  //     {
  //       path: '/',
  //       component: resolve => require.ensure([], () => resolve(require('@/pages/home/index.vue')) ),
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/login.vue')) ),
      }
    ]
  },
  {
    path: '/register',
    component: Main,
    children: [
      {
        path: '/',
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/register.vue')) ),
      }
    ]
  },
  {
    path: '/saveKeystore',
    component: Main,
    children: [
      {
        path: '/',
        component: resolve => require.ensure([], () => resolve(require('@/pages/home/saveKeystore.vue')) ),
      }
    ]
  },
  {
    path: '/account',
    component: Main,
    children: [
      {
        path: '/',
        component: resolve => require.ensure([], () => resolve(require('@/pages/account/index.vue')) ),
      }
    ]
  },
]