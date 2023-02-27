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
    path: '/departments',
    component: () => import('@/layout'),
    children: [
      {
        path: '',
        component: () => import('@/views/departments'),
        name: 'Departments',
        meta: { title: '组织架构', icon: 'tree' }
      }
    ]
  },
  {
    path: '/setting',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'Setting',
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }]
  },
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
  },
];