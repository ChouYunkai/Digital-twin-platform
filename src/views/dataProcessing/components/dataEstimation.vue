<template>
  <div class="dataCleaning">
    <el-row :gutter="40">
      <el-col :span="12" style="border-radius: 10px; box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="grid-content ep-bg-purple">
          <div class="header_1">状态估计</div>
          <div class="fileSelection">
            <div class="title">选择数据文件</div>
            <el-input v-model="file" style="max-width: 100%" class="input-with-select">
              <template #append>
                <el-button>...</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="ids">
          <div class="eid">
            <div class="title">设备ID</div>
            <el-input v-model="eid" style="width: 140px" />
          </div>
          <div class="fid">
            <div class="title">工厂ID</div>
            <el-input v-model="fid" style="width: 140px" />
          </div>
          <div class="cid">
            <div class="title">控制器ID</div>
            <el-input v-model="cid" style="width: 140px" />
          </div>
          <div class="dataType">
            <div class="title">数据类型</div>
            <el-select v-model="dataType" style="width: 140px">
              <el-option v-for="item in datatype_options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <div class="estimateWay">
          <div class="title">估计方法</div>
          <el-select v-model="c_way" style="width: 100%">
            <el-option v-for="item in estimateWay_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="storePath">
          <div class="title">保存路径</div>
          <el-input v-model="s_path" style="max-width: 100%" class="input-with-select">
            <template #append>
              <el-button>...</el-button>
            </template>
          </el-input>
        </div>
        <div class="btns">
          <el-button type="primary" style="padding: 10px 40px">开始估计</el-button>
          <el-button type="warning" style="padding: 10px 20px">暂停</el-button>
          <el-button type="danger" style="padding: 10px 20px">结束</el-button>
        </div>

        <div class="result">
          <div>估计结果</div>
          <div>主轴转速异常</div>
        </div>
      </el-col>
      <el-col :span="12" style="border-radius: 10px; box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
        <div class="grid-content ep-bg-purple">
          <div class="header_2">状态栏</div>
          <div class="over_btn">
            <el-button type="primary" style="padding: 10px 41%; font-size: 18px;">估计状态停止</el-button>
          </div>
          <div class="chart">

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import echarts from '@/plugins/echarts';
import { ref, onMounted } from 'vue'
const file = ref('')
const eid = ref('')
const fid = ref('')
const cid = ref('')
const dataType = ref('')
const c_way = ref('')
const s_path = ref('')

const datatype_options = [
  {
    value: '9600',
    label: '9600'
  }
]
const estimateWay_options = [
  {
    value: '卡尔曼滤波',
    label: '卡尔曼滤波'
  }
]
onMounted(() => {
  getChart();
})

function getChart() {
  var chartDom = document.querySelector('.chart')
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };

  option && myChart.setOption(option);

  option && myChart.setOption(option);
}
</script>

<style lang='scss' scoped>
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

  .ids {
    width: 100%;
    height: 100px;
    margin-top: 20px;
    padding-left: 20px;

    .eid {
      display: inline-block;
      width: 25%;
      height: 100%;
    }

    .fid {
      display: inline-block;
      width: 25%;
      height: 100%;
    }

    .cid {
      display: inline-block;
      width: 25%;
      height: 100%;
    }

    .dataType {
      display: inline-block;
      width: 25%;
      height: 100%;
    }

    .title {
      padding-bottom: 10px;
    }
  }

  .estimateWay {
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

  .chart {
    width: 100%;
    height: 430px;
    margin-top: 20px;
  }
  .result{
  width: 100%;
  height: 80px;
  line-height: 40px;
  padding-left: 20px;
  margin-bottom: 20px;
  margin-top: 0px;
  background-color:#ccc;
        }
}
</style>
