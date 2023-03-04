export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
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
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/import',
    component: () => import('@/layout'),
    hidden: true,
    children: [
      {
        path: '',
        name: 'Import',
        component: () => import('@/views/import'),
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
        meta: { title: '员工管理', icon: 'people' },
      },
      {
        path: 'detail/:id?',
        name: 'Detail',
        component: () => import('@/views/employees/Detail.vue'),
        hidden: true,
        meta: { title: '员工详情' },
      },
      {
        path: 'print/:id',
        name: 'Print',
        component: () => import('@/views/employees/Print.vue'),
        hidden: true,
        meta: { title: '员工打印' },
      }
    ]
  },
  {
    path: '/permission',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'Permission',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限设置',
        icon: 'lock'
      }
    }]
  },
];