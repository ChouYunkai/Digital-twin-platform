<template>
  <div class="dataCleaning">
    <el-row :gutter="40">
      <el-col :span="12" style="
          border-radius: 10px;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        ">
        <div class="grid-content ep-bg-purple">
          <div class="header_1">清洗配置</div>
          <div class="fileSelection">
            <div class="title">选择数据文件</div>
            <el-input v-model="file" style="max-width: 100%" class="input-with-select">
              <template #append>
                <el-button @click="handleFileUpload">...</el-button>
              </template>
            </el-input>
          </div>
          <div class="cleaningWay">
            <div class="title">清洗方式</div>
            <el-select v-model="c_way" style="width: 100%">
              <el-option v-for="item in cleaningWay_options" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <div class="storePath">
            <div class="title">保存路径</div>
            <el-input v-model="s_path" style="max-width: 100%" class="input-with-select">
              <template #append>
                <el-button @click="handleSavePath">...</el-button>
              </template>
            </el-input>
          </div>
          <div class="btns">
            <el-button type="primary" style="padding: 10px 40px">开始清洗</el-button>
            <el-button type="warning" style="padding: 10px 20px">暂停</el-button>
            <el-button type="danger" style="padding: 10px 20px">结束</el-button>
          </div>

        </div>
      </el-col>
      <el-col :span="12" style="
          border-radius: 10px;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        ">
        <div class="grid-content ep-bg-purple">
          <div class="header_2">状态栏</div>
          <div class="over_btn">
            <el-button type="primary" style="padding: 10px 41%; font-size: 18px">数据清洗完成</el-button>
          </div>
          <div class="chart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import echarts from "@/plugins/echarts";
import { ref, onMounted } from "vue";

const file = ref("");
const eid = ref("");
const fid = ref("");
const cid = ref("");
const dataType = ref("");
const c_way = ref("");
const s_path = ref("");

const datatype_options = [
  {
    value: "9600",
    label: "9600"
  }
];
const cleaningWay_options = [
  {
    value: "缺失值填充",
    label: "缺失值填充"
  }
];

onMounted(() => {
  getChart();
});

function getChart() {
  var chartDom = document.querySelector(".chart");
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["原始数据", "修复数据"],
      top: 25
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {}
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["1", "2", "3", "4", "5", "6", "7", "8"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "原始数据",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "修复数据",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  };
  option && myChart.setOption(option);
}
function handleFileUpload() {
  // 处理文件上传逻辑
  const inputElement = document.createElement('input');
  inputElement.type = 'file';
  inputElement.accept = '.csv'; // 可以根据需要设置文件类型限制
  inputElement.onchange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      file.value = selectedFile.name;
      // 可以根据需要将文件信息存储在其他变量中
    }
  };
  inputElement.click();
}
function handleSavePath() {
  // 处理保存路径逻辑
  const inputElement = document.createElement('input');
  inputElement.type = 'file';
  inputElement.webkitdirectory = true; // 在 Chrome 中选择文件夹
  inputElement.multiple = false; // 只能选择一个文件夹
  inputElement.onchange = (event) => {
    const selectedPath = event.target.files[0].path;
    if (selectedPath) {
      s_path.value = selectedPath;
      // 可以根据需要将路径信息存储在其他变量中
    }
  };
  inputElement.click();
}
</script>

<style lang="scss" scoped>
.dataCleaning {
  width: 100%;
  height: 600px;
  font-size: 16px;

  .header_1,
  .header_2 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
  }

  .fileSelection,
  .cleaningWay,
  .storePath,
  .btns {
    width: 100%;
    height: 100px;
    line-height: 40px;
    padding-left: 20px;
    margin-top: 20px;
  }

  .over_btn {
    text-align: center;
    margin-top: 20px;
    width: 100%;
  }

  .chart {
    width: 100%;
    height: 430px;
    margin-top: 20px;
  }
}
</style>
