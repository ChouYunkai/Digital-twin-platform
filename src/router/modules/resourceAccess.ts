// 最简代码，也就是这些字段必须有
export default {
  path: "/resourceAccess",
  redirect: "/resourceAccess/index",
  meta: {
    title: "资源接入",
    icon: "material-symbols:database-sharp",
    rank: 2
  },
  children: [
    {
      path: "/resourceAccess/index",
      component: () => import("@/views/resourceAccess/index.vue"),
      name: "ResourceAccess",
      meta: {
        title: "资源接入"
      }
    }
  ]
} satisfies RouteConfigsTable;
