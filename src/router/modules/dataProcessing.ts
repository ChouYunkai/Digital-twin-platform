// 最简代码，也就是这些字段必须有
export default {
  path: "/dataProcessing",
  redirect: "/dataProcessing/index",
  meta: {
    title: "数据处理",
    icon: "mingcute:box-3-fill",
    rank: 3
  },
  children: [
    {
      path: "/dataProcessing/index",
      component: () => import("@/views/dataProcessing/index.vue"),
      name: "DataProcessing",
      meta: {
        title: "数据处理"
      }
    }
  ]
} satisfies RouteConfigsTable;
