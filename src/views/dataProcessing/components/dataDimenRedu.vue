<template>
  <div class="dataCleaning">
    <el-row :gutter="40">
      <el-col :span="12" style="border-radius: 10px; box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="grid-content ep-bg-purple">
          <div class="header_1">降维配置</div>
          <div class="fileSelection">
            <div class="title">选择数据文件</div>
            <el-input v-model="file" style="max-width: 100%" class="input-with-select">
              <template #append>
                <el-button @click="handleFileUpload">...</el-button>
              </template>
            </el-input>
          </div>
          <div class="dimenredu">
            <div class="title">降维方法</div>
            <el-select v-model="c_way" style="width: 100%">
              <el-option v-for="item in dimenredu_options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="storePath">
            <div class="title">选择保存路径</div>
            <el-input v-model="s_path" style="max-width: 100%" class="input-with-select">
              <template #append>
                <el-button @click="handleSavePath">...</el-button>
              </template>
            </el-input>
          </div>
          <div class="btns">
            <el-button type="primary" style="padding: 10px 40px">开始降维</el-button>
            <el-button type="warning" style="padding: 10px 20px">暂停</el-button>
            <el-button type="danger" style="padding: 10px 20px">结束</el-button>
          </div>

        </div>
      </el-col>
      <el-col :span="12" style="border-radius: 10px; box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="grid-content ep-bg-purple">
          <div class="header_2">状态栏</div>
          <div class="over_btn">
            <el-button type="primary" style="padding: 10px 41%; font-size: 18px;">数据降维完成</el-button>
          </div>
          <div class="upchart"></div>
          <div class="downchart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import echarts from "@/plugins/echarts";
import { EffectScatterChart } from "echarts/charts";
echarts.use([EffectScatterChart]);
import { ScatterChart } from "echarts/charts";
echarts.use([ScatterChart]);
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
    label: "9600",
  },
];
const dimenredu_options = [
  {
    value: "缺失值填充",
    label: "缺失值填充",
  },
];
onMounted(() => {
  getChart();
  getChart1();
});

function getChart() {
  var chartDom = document.querySelector(".upchart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "数据降维前",
    },
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68],
        ],
        type: "scatter",
      },
    ],
  };
  option && myChart.setOption(option);
}
function getChart1() {
  var chartDom = document.querySelector(".downchart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "数据降维后",
    },
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68],
        ],
        type: "scatter",
      },
    ],
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

  .fileSelection {
    width: 100%;
    height: 100px;
    line-height: 40px;
    padding-left: 20px;
  }

  .dimenredu {
    width: 100%;
    height: 100px;
    line-height: 40px;
    padding-left: 20px;
  }

  .storePath {
    width: 100%;
    height: 100px;
    line-height: 40px;
    padding-left: 20px;
  }

  .btns {
    width: 100%;
    height: 100px;
    line-height: 40px;
    padding-left: 20px;
  }

  .over_btn {
    margin-top: 20px;
    text-align: center;
  }

  .upchart {
    width: 100%;
    height: 300px;
    margin-top: 20px;
  }

  .downchart {
    width: 100%;
    height: 300px;
  }
}
</style>
