<script setup lang="ts">
import { ref } from "vue";
const showMore = () => {
  console.log("查看更多");
};
const data = ref([
  { images: "/src/assets/images/jgzcs.png", title: "机构这册数", num: "19" },
  { images: "/src/assets/images/jrbz.png", title: "今日标识注册量", num: "2" },
  { images: "/src/assets/images/jrjx.png", title: "今日标识解析量", num: "0" }
]);
const data_1 = ref([
  { images: "/src/assets/images/jgzcs.png", title: "机构这册数", num: "19" },
  { images: "/src/assets/images/xjjd.png", title: "下级节点数", num: "2" },
  { images: "/src/assets/images/jrbz.png", title: "今日标识注册数", num: "0" },
  { images: "/src/assets/images/jrjx.png", title: "今日解析数", num: "0" }
]);
const state = ref(false);
</script>

<template>
  <el-card shadow="hover" class="mb-[20px]">
    <template #header>
      <div class="card-header">
        <span>数据统计</span>
        <!-- <a class="primary-color float-right">查看更多</a> -->
        <el-link
          class="primary-color float-right"
          type="primary"
          @click="showMore"
          >查看更多</el-link
        >
      </div>
    </template>
    <template v-if="state">
      <div v-for="item in data" :key="item.title" class="box h-[55px] relative">
        <img :src="item.images" class="w-[25px] h-[25px] absolute top-[15px]" />
        <span class="regular-text-color absolute top-[15px] left-[41px]">{{
          item.title
        }}</span>
        <span class="absolute top-[15px] right-0 text-[20px] font-bold">{{
          item.num
        }}</span>
      </div>
    </template>
    <template v-if="!state">
      <div
        v-for="item in data_1"
        :key="item.title"
        class="box box_1 relative h-[80px]"
      >
        <img :src="item.images" class="w-[25px] h-[25px] absolute top-[29px]" />
        <span class="regular-text-color absolute top-[18px] left-[40px]">
          {{ item.title }}
        </span>
        <span class="absolute top-[40px] left-[40px] text-[20px] font-bold">
          {{ item.num }}
        </span>
      </div>
      <div class="h-[15px] relative text-[14px]">
        <span class="regular-text-color absolute left-[40px]">注册总数</span>
        <span class="mask-layer-color absolute left-[110px]">213</span>
        <span class="regular-text-color absolute right-[65px]">解析总数</span>
        <span class="mask-layer-color absolute right-[30px]">411</span>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.box {
  border-bottom: 1px dashed #e6e8eb;
}

.box:last-child {
  border-bottom: none;
}

.box_1 {
  display: inline-block;
  width: 50%;
}

.box_1:nth-child(3),
.box_1:nth-child(4) {
  border-bottom: none;
}

:deep(.el-card__body) {
  padding-top: 0;
}
</style>
