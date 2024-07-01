<script setup lang="ts">
import {
  Panel,
  Mark,
  Org,
  Prefix,
  Node,
  Application,
  Organization
} from "./components";

import { useNav } from "@/layout/hooks/useNav";
import { ref } from "vue";

defineOptions({
  name: "DataMark"
});

const { isCollapse } = useNav();

const menuList = ref([
  { key: "panel", name: "首页", show: true, component: Panel },
  { key: "mark", name: "标识管理", show: true, component: Mark },
  { key: "org", name: "机构管理", show: true, component: Org },
  { key: "app", name: "应用管理", show: true, component: Application },
  { key: "prefix", name: "前缀管理", show: true, component: Prefix },
  { key: "node", name: "节点管理", show: true, component: Node }
]);
const currentMenu = ref<string>("org");

const toComponent = ref(Panel);

function menuClick(key: string) {
  menuList.value.filter((item: any) => {
    if (item.key === key) {
      currentMenu.value = key;
      toComponent.value = item.component;
    }
  });
}

function menuHide(key: string) {
  menuList.value.filter((item: any) => {
    if (item.key === key) {
      item.show = false;
    }
  });
}
</script>

<template>
  <div>
    <div
      v-if="isCollapse"
      class="w-[160px] h-screen bg-[#fff] absolute overflow-hidden absolute top-0 left-0 p-[20px]"
      :class="isCollapse ? 'menu' : ''"
    >
      <div class="w-[120px] text-center">
        <span class="text-[18px] h-[60px] leading-[60px] text-center"
          >数据标识管理</span
        >
        <div
          v-for="item in menuList"
          :key="item.name"
          class="h-[48px] mt-[20px]"
        >
          <el-button
            v-show="item.show"
            class="btn an-btn"
            type="primary"
            @click="menuClick(item.key)"
            >{{ item.name }}</el-button
          >
        </div>
      </div>
    </div>
    <div :class="isCollapse ? 'dw' : 'hw'" class="ml-auto">
      <Organization />
      <component :is="toComponent" />
    </div>
  </div>
</template>

<style scoped lang="scss">
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

@keyframes closed {
  from {
    width: 0;
  }

  to {
    width: 160px;
  }
}

:deep(.el-card) {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);
}
</style>
