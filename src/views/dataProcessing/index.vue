<script setup lang="ts">
import dataCleaning from "./components/dataCleaning.vue";
import dataDimenRedu from "./components/dataDimenRedu.vue";
import dataFusion from "./components/dataFusion.vue";
import dataEstimation from "./components/dataEstimation.vue";
import ontologyConstruction from "./components/ontologyConstruction.vue";
import ontologyInstantiation from "./components/ontologyInstantiation.vue";
import { useNav } from "@/layout/hooks/useNav";
import { ref } from "vue";

const { isCollapse } = useNav();

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "DataProcessing"
});

const currentMenu = ref<string>("org");
const toComponent = ref(dataCleaning);

const menuList = ref([
  {
    key: "dataCleaning",
    name: "数据清洗",
    show: true,
    component: dataCleaning
  },
  {
    key: "dataDimenRedu",
    name: "数据降维",
    show: true,
    component: dataDimenRedu
  },
  { key: "dataFusion", name: "数据融合", show: true, component: dataFusion },
  {
    key: "dataEstimation",
    name: "状态估计",
    show: true,
    component: dataEstimation
  },
  {
    key: "ontologyConstruction",
    name: "本体构建",
    show: true,
    component: ontologyConstruction
  },
  {
    key: "ontologyInstantiation",
    name: "标识赋码",
    show: true,
    component: ontologyInstantiation
  }
]);

const selectedMenuItem = ref<string>("dataCleaning"); // 初始化选中的菜单项为数据清洗

function menuClick(key: string) {
  menuList.value.filter((item: any) => {
    if (item.key === key) {
      currentMenu.value = key;
      toComponent.value = item.component;
    }
  });
}
</script>

<template>
  <div>
    <div v-if="isCollapse" class="w-[160px] h-screen bg-[#fff] absolute overflow-hidden absolute top-0 left-0 p-[20px]"
      :class="isCollapse ? 'menu' : ''">
      <div class="w-[120px] text-center">
        <span class="text-[18px] h-[60px] leading-[60px] text-center">数据处理引擎</span>
        <div v-for="item in menuList" :key="item.name" class="h-[48px] mt-[20px]">
          <el-button v-show="item.show" class="btn an-btn" type="primary" @click="menuClick(item.key)">{{ item.name
            }}</el-button>
        </div>
      </div>
    </div>
    <div :class="isCollapse ? 'dw' : 'hw'" class="ml-auto">
      <component :is="toComponent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  animation: closed 0.5s ease-in-out;

  .btn {
    justify-content: left;
    width: 100%;
    height: 100%;
    font-size: 16px;
    border-radius: 8px;
  }
}

:deep(.el-card) {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
}
</style>
