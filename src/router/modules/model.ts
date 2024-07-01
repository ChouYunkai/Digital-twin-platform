// 最简代码，也就是这些字段必须有
export default {
  path: "/model",
  meta: {
    title: "数字孪生平台",
    icon: "tabler:automation",
    rank: "1"
  },
  children: [
    {
      path: "/views/model",
      name: "数字孪生平台",
      component: () => import("@/views/model/数字孪生平台.vue"),
      meta: {
        title: "数字孪生平台"
      }
    }
  ]
};
