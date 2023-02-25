export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: () => import('@/layout'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];


export const asyncRoutes = [
  {
    path: '/employees',
    component: () => import('@/layout'),
    children: [
      {
        path: '',
        name: 'Employees',
        component: () => import('@/views/employees'),
        meta: { title: '员工', icon: 'people' }
      }
    ]
  }
];