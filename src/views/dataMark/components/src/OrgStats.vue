<script setup lang="ts">
import { ref } from "vue";

const organizeData = ref([
  {
    rank: "1",
    name: "企业节点-确权",
    nums: "46"
  },
  {
    rank: "2",
    name: "浙江云聚数字科技有限公司",
    nums: "40"
  },
  {
    rank: "3",
    name: "企业节点-确权",
    nums: "21"
  },
  {
    rank: "4",
    name: "企业节点-确权",
    nums: "13"
  },
  {
    rank: "5",
    name: "企业节点-确权",
    nums: "6"
  }
]);
</script>

<template>
  <el-card shadow="hover" class="mb-[20px]">
    <template #header>
      <div class="card-header">
        <span>机构统计</span>
        <el-link class="primary-color float-right" type="primary"
          >查看更多</el-link
        >
        <!-- <a class="primary-color float-right">查看更多</a> -->
      </div>
    </template>
    <div>
      <ElTable
        :data="organizeData"
        border
        style="width: 100%; height: 100%"
        :header-cell-style="{ backgroundColor: '#f3f6f9' }"
      >
        <ElTableColumn prop="rank" label="排名" width="60" />
        <ElTableColumn prop="name" label="机构名称" />
        <ElTableColumn prop="nums" label="注册量" width="70" />
      </ElTable>
    </div>
  </el-card>
</template>
