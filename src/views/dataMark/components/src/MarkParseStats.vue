<script setup lang="ts">
import Segmented, { OptionsType } from "@/components/ReSegmented";
import { ref } from "vue";
import { useECharts } from "@pureadmin/utils";

/** 基础用法 */
const value = ref(0); // 必须为number类型
const optionsBasis: Array<OptionsType> = [
  {
    label: "近7日"
  },
  {
    label: "近30日"
  }
];
const chartRef = ref();

const { setOptions } = useECharts(chartRef, {});
setOptions({
  xAxis: {
    type: "category",
    data: ["01-01", "01-02", "01-03", "01-04", "01-05", "01-06", "01-07"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [20, 33, 63, 82, 55, 76, 90],
      type: "line",
      smooth: true,
      symbol: "none", // 设置标记点形状为无
      showSymbol: false // 不显示标记点
    }
  ]
});
</script>

<template>
  <el-card shadow="hover" class="mb-[20px]">
    <template #header>
      <div class="card-header">
        <span>标识解析统计</span>
        <Segmented
          v-model="value"
          class="right-[40px] top-[15px]"
          :options="optionsBasis"
        />
      </div>
    </template>
    <div ref="chartRef" style="width: 100%; height: 35vh" />
  </el-card>
</template>
