/**
 * 管理员菜单
 * @type {*[]}
 */

  // 查看菜单列表
const menus = [
    {
        name: "首页",
        path: "/",
        icon: "ios-navigate"
      },
      // 系统管理
      {
        name: "系统管理",
        path: "set",
        icon: "ios-cog",
        children: [
          {
            icon: "md-contacts",
            name: "管理员",
            path: "/admin"
          },
          {
            icon: "md-contacts",
            name: "管理员管理",
            path: "/adminList"
          }
        ]
      },
      {
        name: "分类管理",
        path: "category",
        icon: "md-move",
        children: [
          {
            name: "分类列表",
            path: "/category",
            icon: "md-list"
          },
          {
            name: "分类创建",
            path: "/category/create",
            icon: "md-add-circle"
          }
        ]
      },
      {
        name: "资产管理",
        path: "goods",
        icon: "md-list-box",
        children: [
          {
            name: "资产列表",
            path: "/goods",
            icon: "md-list"
          },
          {
            name: "资产创建",
            path: "/goods/create",
            icon: "md-add-circle"
          }
        ]
      },
    //   {
    //     name: "借出管理",
    //     path: "loanout",
    //     icon: "md-text",
    //     children: [
    //       {
    //         name: "借出列表",
    //         path: "/loanoutList",
    //         icon: "md-list"
    //       },
    //       {
    //         name: "归还列表",
    //         path: "/returnList",
    //         icon: "md-list"
    //       },
    //     ]
    //   }

  ];

export {menus};
