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
  // // 这里的路由规则必须放在所有路由的最后面，否则在做动态路由时，刷新动态路由会导致出现404
  // { path: '*', redirect: '/404', hidden: true },
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


];


export const asyncRoutes = [
  {
    path: '/departments',
    component: () => import('@/layout'),
    children: [
      {
        path: '',
        name: 'departments',
        component: () => import('@/views/departments'),
        meta: { title: '组织架构', icon: 'tree' }
      }
    ]
  },

  {
    path: '/setting',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'settings',
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
        name: 'employees',
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
      name: 'permissions',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限设置',
        icon: 'lock'
      }
    }]
  },
  {
    path: '/salary',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'salarys',
      component: () => import('@/views/salary'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }]
  },
  {
    path: '/social',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'social_securitys',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }]
  },
  {
    path: '/approval',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'approvals',
      component: () => import('@/views/approval'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }]
  },
  {
    path: '/attendance',
    component: () => import('@/layout'),
    children: [{
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendance'),
      meta: {
        title: '考勤',
        icon: 'excel'
      }
    }]
  },
];