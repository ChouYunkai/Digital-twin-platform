<script setup lang="ts">
import { ref } from "vue";
import { useECharts } from "@pureadmin/utils";

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {});
setOptions({
  tooltip: {
    trigger: "item"
  },
  legend: {
    top: "5%",
    left: "center"
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" }
      ]
    }
  ]
});
</script>

<template>
  <el-card shadow="hover" class="mb-[20px]">
    <template #header>
      <div class="card-header">
        <span>机构行业分析</span>
      </div>
    </template>
    <div ref="chartRef" style="width: 100%; height: 35vh" />
  </el-card>
</template>
