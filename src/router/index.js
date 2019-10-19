const routers = [
  {
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: (resolve) => require(['../views/login.vue'], resolve),
  },
  {
    path: '/',
    component(resolve) {
      require(['../views/layout.vue'], resolve);
    },
    children: [
      {
        //todo: 首页
        path: '/',
        name: 'index',
        meta: {module: "/", title: '首页'},
        component(resolve) {
          require(['../views/index.vue'], resolve);
        }
      },

      //todo: 管理员
      {
        path: 'admin',
        name: 'admin',
        meta: {module: "/admin", group: "set", title: '管理员 - 列表'},
        component: (resolve) => require(['../views/admin/index.vue'], resolve),
      },
      {
        path: 'adminlist',
        name: 'adminList',
        meta: {module: "/adminList", group: "set", title: '管理员 - 列表'},
        component: (resolve) => require(['../views/admin/adminList.vue'], resolve),
      },
      //todo: 分类管理
      {
        path: 'category',
        name: 'category',
        meta: {module: "/category", group: "category", title: '分类 - 列表'},
        component: (resolve) => require(['../views/category/list.vue'], resolve),
      },
      {
        path: 'category/create',
        name: 'category/create',
        meta: {module: "/category/create", group: "category", title: '分类 - 创建'},
        component: (resolve) => require(['../views/category/create.vue'], resolve),
      },
      {
        path: 'category/update/:id',
        name: 'category/update',
        meta: {edit: true, module: "/category", group: "category", title: '分类 - 更新'},
        component: (resolve) => require(['../views/category/update.vue'], resolve),
      },
      //todo: 文章管理
      {
        path: 'goods',
        name: 'goods',
        meta: {module: "/goods", group: "goods", title: '物品 - 列表'},
        component: (resolve) => require(['../views/article/list.vue'], resolve),
      },
      {
        path: 'goods/create',
        name: 'goods/create',
        meta: {module: "/goods/create", group: "goods", title: '资产 - 创建'},
        component: (resolve) => require(['../views/article/create.vue'], resolve),
      },
      {
        path: 'goods/update/:id',
        name: 'goods/update',
        meta: {edit: true, module: "/goods", group: "goods", title: '资产 - 更新'},
        component: (resolve) => require(['../views/article/update.vue'], resolve),
      },
      //todo: 借还管理
      {
        path: 'loanoutList',
        name: 'loanoutList',
        meta: {module: "/loanoutList", group: "loanoutList", title: '借出- 列表'},
        component: (resolve) => require(['../views/loanOut/loanOutList.vue'], resolve),
      },
      {
        path: 'returnList',
        name: 'returnList',
        meta: {module: "/returnList", group: "returnList", title: '归还 - 列表'},
        component: (resolve) => require(['../views/loanOut/returnList.vue'], resolve),
      },
      {
        //todo: 404
        path: '/403',
        name: '403',
        meta: {module: "/", title: '403 - 权限不足'},
        component(resolve) {
          require(['../views/403.vue'], resolve);
        }
      },
      {
        //todo: 404
        path: '*',
        name: '404',
        meta: {module: "/", title: '404 - 页面不存在'},
        component(resolve) {
          require(['../views/404.vue'], resolve);
        }
      }
    ]
  }
];

export default routers;
