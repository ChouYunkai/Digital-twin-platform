<template>
  <div class="equAcc">
    <div class="header">
      <el-button @click="protocolConfig">协议配置</el-button>
      <el-button @click="acquSetting">采集设置</el-button>
      <el-button @click="update">更新</el-button>

      <el-button type="primary" style="padding: 0 40px" class="add" @click="Add">添加</el-button>
    </div>
    <div class="equipment">
      <h3 style="padding: 5px 10px; border-bottom: 1px solid #ccc">设备</h3>

      <div class="table">
        <div class="cell" v-for="item in equipment" :key="item" @click="selectCell(item)"> <button class="delete-btn"
            @click="deleteEquipment(item)">
            删除
            <i icon class="mingcute:delete-2-line"></i>
            <!-- 删除图标 -->
          </button>
          <div style="
              display: inline-block;
              margin: 10px 0 5px 0;
              font-weight: 700;
            ">
            {{ item.e_name }}
          </div>
          <div style="margin: 10px 0 15px 0; font-size: 14px; color: #ccc">
            {{ item.e_type }}
          </div>
          <div style="margin: 10px 0 5px 0; font-size: 14px; color: #ccc">
            设备状态：{{ item.e_status }}
          </div>
          <div style="margin: 10px 0 5px 0; font-size: 14px; color: #ccc">
            网关ID:{{ item.e_id }}</div>
          <!-- 删除按钮 -->
        </div>
      </div>
    </div>
    <div class="production">
      <h3 style="padding: 5px 10px; border-bottom: 1px solid #ccc">产品</h3>
      <div class="table">
        <div class="cell" v-for="item in production" :key="item">
          <div style="
              display: inline-block;
              margin: 10px 0 5px 0;
              font-weight: 700;
            ">
            {{ item.e_name }}
          </div>
          <div style="margin: 10px 0 15px 0; font-size: 14px; color: #ccc">
            {{ item.e_type }}
          </div>
          <div style="margin: 10px 0 5px 0; font-size: 14px; color: #ccc">
            产品/产品状态：{{ item.e_status }}
          </div>
          <div style="margin: 10px 0 5px 0; font-size: 14px; color: #ccc">
            网关ID:{{ item.e_id }}</div>
        </div>
      </div>
    </div>
    <div class="service">
      <h3 style="padding: 5px 10px; border-bottom: 1px solid #ccc">服务</h3>
      <div class="table">
        <div class="cell" v-for="item in service" :key="item">
          <div style="
              display: inline-block;
              margin: 10px 0 5px 0;
              font-weight: 700;
            ">
            {{ item.e_name }}
          </div>
          <div style="margin: 10px 0 15px 0; font-size: 14px; color: #ccc">
            {{ item.e_type }}
          </div>
          <div style="margin: 10px 0 5px 0; font-size: 14px; color: #ccc">
            服务/服务状态：{{ item.e_status }}
          </div>
          <div style="margin: 10px 0 5px 0; font-size: 14px; color: #ccc">
            网关ID:{{ item.e_id }}</div>
        </div>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog v-model="dialogVisible" title="添加" width="880" :before-close="handleClose_dialog">
      <div class="content">
        <div class="c_header">
          <span>资源类型：</span>
          <el-select v-model="r_type" style="width: 160px">
            <el-option v-for="item in r_type_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <span style="padding: 0 10px"></span>
          <span>设备类型：</span>
          <el-select v-model="e_type" style="width: 160px">
            <el-option v-for="item in e_type_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <span style="padding: 0 10px"></span>
          <span>设备名称：</span>
          <el-input v-model="name" style="width: 160px" />
          <span style="padding: 0 29px"></span>
          <el-button>搜索</el-button>
        </div>
        <div class="table">
          <el-table class="custom-table" :data="tableData" border style="width: 100%; max-height: 100%" stripe>
            <el-table-column prop="r_type_" label="资源类型"></el-table-column>
            <el-table-column prop="e_type_" label="设备类型"></el-table-column>
            <el-table-column prop="e_name_" label="设备名称"></el-table-column>
            <el-table-column prop="selection_" label="选择">
              <template v-slot="{ row }">
                <span class="sp" :style="{
                    backgroundColor: row.selection_ === 'true' ? 'green' : 'red'
                  }"></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="AddSure"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 协议配置抽屉 -->
    <el-drawer v-model="drawer" title="协议配置" :direction="direction" :before-close="handleClose">
      <el-divider content-position="center" style="display: flex; flex-direction: column; align-items: center;">
        <h4>协议:</h4>
        <el-select v-model="getway_id" style="width: 250px">
          <el-option v-for="item in getway_id_options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-divider>

      <div class="line_1" v-if="getway_id == '1'">
        <span class="port">端口</span>
        <span class="protocol">网关ID</span>
        <span class="port_s">
          <el-select v-model="port" style="width: 150px">
            <el-option v-for="item in port_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </span>
        <span class="protocol_s">
          <el-select v-model="protocol" style="width: 150px">
            <el-option v-for="item in protocol_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </span>
        <el-divider content-position="left">参数配置:</el-divider>
        <div style="padding-left: 10px">端口</div>
        <div class="port_setting">
          <div class="baud">
            <span style="display: block">波特率</span>
            <span>
              <el-select v-model="baud" style="width: 100px">
                <el-option v-for="item in baud_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </span>
          </div>
          <div class="dataBits">
            <span style="display: block">数据位</span>
            <span>
              <el-select v-model="dataBit" style="width: 100px">
                <el-option v-for="item in dataBit_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </span>
          </div>
          <div class="stopBits">
            <span style="display: block">停止位</span>
            <span>
              <el-select v-model="stopBit" style="width: 100px">
                <el-option v-for="item in stopBit_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </span>
          </div>
          <div class="school">
            <span style="display: block">校验</span>
            <span>
              <el-select v-model="school" style="width: 100px">
                <el-option v-for="item in school_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </span>
          </div>
        </div>
        <div style="padding-left: 10px">Modbus RTU</div>
        <div class="moubus_setting">
          <div class="m_type">
            <span style="display: block">类型</span>
            <span>
              <el-select v-model="m_type" style="width: 100px">
                <el-option v-for="item in m_type_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </span>
          </div>
          <div class="addr">
            <span style="display: block">地址</span>
            <span>
              <el-select v-model="addr" style="width: 100px">
                <el-option v-for="item in addr_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </span>
          </div>
          <div class="num">
            <span style="display: block">数量</span>
            <span>
              <el-select v-model="num" style="width: 100px">
                <el-option v-for="item in num_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </span>
          </div>
          <el-button type="primary" style="padding: 0 35px" @click="sure">确定</el-button>
          <div class="m_tab">
            <el-table class="custom-table" :data="tableData_m" border
              style="width: 100%; max-height: 80%; overflow: auto" stripe>
              <el-table-column prop="type_m" label="类型"></el-table-column>
              <el-table-column prop="addr_m" label="地址"></el-table-column>
              <el-table-column prop="num_m" label="数量"></el-table-column>
            </el-table>
            <el-button type="primary" style="padding: 0 20px; margin-top: 10px; margin-left: 85%"
              @click="setting">配置</el-button>
          </div>
          <el-divider content-position="left">协议更新与部署:</el-divider>
          <div class="lineCompile">
            <el-progress :percentage="compileRate" :text-inside="true" style="width: 80%; display: inline-block"
              :stroke-width="30" />
            <span style="color: #0c78e1; padding: 0 0 0 30px">编译</span>
          </div>
          <div class="issue">
            <el-progress :percentage="issueRate" :text-inside="true" style="width: 80%; display: inline-block"
              :stroke-width="30" />
            <span style="color: #0c78e1; padding: 0 0 0 30px">下发</span>
          </div>
          <el-divider content-position="left">适配状态:</el-divider>
          <div class="status">
            <el-button type="primary" style="padding: 0 45px" @click="searchProStatus">查询协议适配状态</el-button>
            <el-button type="primary" style="padding: 0 45px" @click="searchGetStatus">查询边缘网关状态</el-button>
          </div>
          <div class="res_status" style="
              width: 100%;
              height: 60px;
              margin-top: 10px;
              border-bottom: 1px solid #ccc;
            ">
            <div class="left">
              <span>协议适配状态</span>
              <el-tag type="success" class="custom-tag" style="width: 200px">状态文字</el-tag>
            </div>

            <div class="right">
              <span>边缘网关状态</span>
              <el-tag type="success" class="custom-tag" style="width: 200px">状态文字</el-tag>
            </div>
          </div>
          <div class="ok_or_not" style="margin-top: 10px; text-align: right">
            <el-button type="primary" style="padding: 0 30px" @click="finish">完成</el-button>
            <el-button style="padding: 0 30px" @click="cancel">取消</el-button>
          </div>
        </div>
      </div>
      <div class="line_1_" v-else-if="getway_id == '2'">
        <span class="port">端口</span>
        <span class="protocol">网关ID</span>
        <span class="port_s">
          <el-select v-model="port_1" style="width: 200px">
            <el-option v-for="item in port_1_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </span>
        <span class="protocol_s">
          <el-select v-model="protocol_1" style="width: 200px">
            <el-option v-for="item in protocol_1_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </span>
        <el-divider content-position="left">参数配置:</el-divider>
        <h3 style="padding-left: 10px">MQTT</h3>
        <div class="cont">
          <div class="tar_addr" style="margin-top: 5px">
            <span>目标地址：</span>
            <el-input v-model="tar_addr" style="width: 80%" />
          </div>
          <div class="tar_port" style="margin-top: 10px">
            <span>目标端口：</span>
            <el-input v-model="tar_port" style="width: 80%" />
          </div>
          <div class="device_account" style="margin-top: 10px">
            <span>设备账户：</span>
            <el-input v-model="device_account" style="width: 80%" />
          </div>
          <div class="device_pwd" style="margin-top: 10px">
            <span>设备密码：</span>
            <el-input v-model="device_pwd" style="width: 80%" />
          </div>
          <div class="clientId" style="margin-top: 10px">
            &nbsp;
            <span>ClientID：</span>
            <el-input v-model="clientId" style="width: 80%" />
          </div>
          <div class="sub_topic" style="margin-top: 10px">
            <span>订阅主题：</span>
            <el-input v-model="sub_topic" style="width: 80%" />
          </div>
          <div class="issue_topic" style="margin-top: 10px">
            <span>发布主题：</span>
            <el-input v-model="issue_topic" style="width: 80%" />
          </div>
          <div class="sel" style="margin-top: 10px">
            <div class="left" style="display: inline-block; width: 50%">
              <span>QOS：</span>
              <el-select v-model="qos" placeholder="Select" style="width: 120px">
                <el-option v-for="item in qos_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <div class="right" style="display: inline-block">
              <span>清理会话状态：</span>
              <el-select v-model="cls" placeholder="Select" style="width: 120px">
                <el-option v-for="item in cls_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="conf" style="text-align: right; margin-top: 10px">
            <el-button type="primary" style="padding: 0 20px">配置</el-button>
          </div>
        </div>
        <el-divider content-position="left">协议更新与部署:</el-divider>
        <div class="lineCompile">
          <el-progress :percentage="compileRate" :text-inside="true" style="width: 80%; display: inline-block"
            :stroke-width="30" />
          <span style="color: #0c78e1; padding: 0 0 0 30px">编译</span>
        </div>
        <div class="issue">
          <el-progress :percentage="issueRate" :text-inside="true" style="width: 80%; display: inline-block"
            :stroke-width="30" />
          <span style="color: #0c78e1; padding: 0 0 0 30px">下发</span>
        </div>
        <el-divider content-position="left">适配状态:</el-divider>
        <div class="status">
          <el-button type="primary" style="padding: 0 45px" @click="searchProStatus">查询协议适配状态</el-button>
          <el-button type="primary" style="padding: 0 45px" @click="searchGetStatus">查询边缘网关状态</el-button>
        </div>
        <div class="res_status" style="
            width: 100%;
            height: 60px;
            margin-top: 10px;
            border-bottom: 1px solid #ccc;
          ">
          <div class="left">
            <span>协议适配状态</span>
            <el-input v-model="p_status" style="width: 200px" />
          </div>
          <div class="right">
            <span>边缘网关状态</span>
            <el-input v-model="g_status" style="width: 200px" />
          </div>
        </div>
        <div class="ok_or_not" style="margin: 10px 0; text-align: right">
          <el-button type="primary" style="padding: 0 30px" @click="finish">完成</el-button>
          <el-button style="padding: 0 30px" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 采集设置抽屉 -->
    <el-drawer v-model="drawer_2" title="采集设置" :direction="direction_2" :before-close="handleClose_2">
      <el-divider content-position="left">参数配置</el-divider>
      <div class="line_2">
        <span class="period">采集周期</span>
        <span class="storeFormat">存储格式</span>
        <span class="period_s">
          <el-select v-model="period" style="width: 200px">
            <el-option v-for="item in period_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </span>
        <span class="storeFormat_s">
          <el-select v-model="storeFormat" style="width: 200px">
            <el-option v-for="item in storeFormat_options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </span>
        <div class="storePath">
          <div>保存地址</div>
          <el-input v-model="storePath" style="max-width: 100%" class="input-with-select">
            <template #append> <el-button @click="store_path" />... </template>
          </el-input>
        </div>
        <div class="set" style="background-color: #eee; padding: 20px 0; margin-top: 20px">
          <h3>远程kafka服务器设置</h3>
          <div style="margin-top: 20px">Bootstrap Servers</div>
          <el-input v-model="boot_server" style="width: 100%" placeholder="请输入" />
          <div style="margin-top: 20px">Topics</div>
          <el-input v-model="topic" style="width: 100%" placeholder="请输入" />
        </div>
        <div class="status_lan">
          <el-divider content-position="left">状态栏</el-divider>
        </div>
        <div class="btn_over_or_not" style="margin-top: 10px; text-align: right">
          <el-button type="primary" style="padding: 0 30px" @click="finish_2">完成</el-button>
          <el-button style="padding: 0 30px" @click="cancel_2">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "EquipmentAccess",
  data() {
    return {
      equipment: [
        {
          e_type: "喷水织机",
          e_name: "喷水织机M23",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "1",
          e_name: "1",
          e_status: "1",
          e_id: "1"
        },
        {
          e_type: "1",
          e_name: "1",
          e_status: "1",
          e_id: "1"
        },
        {
          e_type: "1",
          e_name: "1",
          e_status: "1",
          e_id: "1"
        },
        {
          e_type: "1",
          e_name: "1",
          e_status: "1",
          e_id: "1"
        },
        {
          e_type: "1",
          e_name: "1",
          e_status: "1",
          e_id: "1"
        },
        {
          e_type: "1",
          e_name: "1",
          e_status: "1",
          e_id: "1"
        },
        {
          e_type: "1",
          e_name: "1",
          e_status: "1",
          e_id: "1"
        }
      ],
      service: [
        {
          e_type: "服务类型1",
          e_name: "服务1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "服务类型1",
          e_name: "服务1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "服务类型1",
          e_name: "服务1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "服务类型1",
          e_name: "服务1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "服务类型1",
          e_name: "服务1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "服务类型1",
          e_name: "服务1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "服务类型1",
          e_name: "服务1",
          e_status: "已适配",
          e_id: "C001"
        }
      ],
      production: [
        {
          e_type: "产品类型1",
          e_name: "产品1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "产品类型1",
          e_name: "产品1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "产品类型1",
          e_name: "产品1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "产品类型1",
          e_name: "产品1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "产品类型1",
          e_name: "产品1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "产品类型1",
          e_name: "产品1",
          e_status: "已适配",
          e_id: "C001"
        },
        {
          e_type: "产品类型1",
          e_name: "产品1",
          e_status: "已适配",
          e_id: "C001"
        }
      ],
      dialogVisible: false,
      r_type: "",
      e_type: "",
      name: "",
      r_type_options: [
        {
          value: "1",
          label: "设备"
        },
        {
          value: "2",
          label: "产品"
        },
        {
          value: "3",
          label: "服务"
        }
      ],
      e_type_options: [
        {
          value: "整经机",
          label: "整经机"
        }
      ],
      data: {
        r_type: "",
        e_type: "",
        e_name: "",
        selection: ""
      },
      tableData: [
        {
          r_type_: "",
          e_type_: "",
          e_name_: "",
          selection_: ""
        }
      ],
      drawer: false,
      drawer_2: false,
      direction: "rtl",
      direction_2: "rtl",
      port: "",
      port_1: "",
      port_1_options: [],
      protocol_1: "",
      protocol_1_options: [],
      port_options: [
        {
          value: "DB9",
          label: "DB9"
        }
      ],
      protocol: "",
      protocol_options: [
        {
          value: "MODBUS",
          label: "MODBUS"
        }
      ],
      baud: "",
      baud_options: [
        {
          value: "9600",
          label: "9600"
        }
      ],
      dataBit: "",
      dataBit_options: [
        {
          value: "7",
          label: "7"
        }
      ],
      stopBit: "",
      stopBit_options: [
        {
          value: "1",
          label: "1"
        }
      ],
      school: "",
      school_options: [
        {
          value: "None",
          label: "None"
        }
      ],
      m_type: "",
      m_type_options: [
        {
          value: "coil",
          label: "coil"
        }
      ],
      addr: "",
      addr_options: [
        {
          value: "3200",
          label: "3200"
        }
      ],
      num: "",
      num_options: [
        {
          value: "80",
          label: "80"
        }
      ],
      tableData_m: [
        {
          type_m: "1",
          addr_m: "1",
          num_m: "1"
        },
        {
          type_m: "1",
          addr_m: "1",
          num_m: "1"
        }
      ],
      compileRate: "60",
      issueRate: "50",
      p_status: "",
      g_status: "",
      period: "",
      period_options: [
        {
          value: "200ms",
          label: "200ms"
        }
      ],
      storeFormat: "",
      storeFormat_options: [
        {
          value: "Json",
          label: "Json"
        }
      ],
      storePath: "",
      boot_server: "",
      topic: "",
      getway_id: "1",
      getway_id_options: [
        {
          value: "1",
          label: "Modbus RTU"
        },
        {
          value: "2",
          label: "MQTT"
        }
      ],
      qos: "",
      qos_options: [
        {
          value: "1",
          label: "Modbus RTU"
        }
      ],
      cls: "",
      cls_options: [
        {
          value: "1",
          label: "Modbus RTU"
        }
      ],
      tar_addr: "",
      tar_port: "",
      device_account: "",
      decive_pwd: "",
      clientId: "",
      sub_topic: "",
      issue_topic: "",
      selectedCell: null // 添加一个用来存储选中cell信息的变量
    };
  },
  methods: {
    //添加按钮
    Add() {
      this.dialogVisible = true;
    },

    deleteEquipment(item) {
      // 在这里编写删除设备的逻辑，例如从 equipment 数组中删除对应的 item
      // 例如：
      const index = this.equipment.indexOf(item);
      if (index !== -1) {
        this.equipment.splice(index, 1); // 从数组中删除该设备信息
      }
    },

    //弹窗确认按钮
    AddSure() {
      this.dialogVisible = false;
      //选择设备选项
      if (this.r_type == "1") {
      }
      //选择产品选项
      else if (this.r_type == "2") {
      }
      //选择服务选项
      else if (this.r_type == "3") {
      }
    },
    //删除按钮
    dele() {},
    protocolConfig() {
      this.drawer = true;
    },
    acquSetting() {
      this.drawer_2 = true;
    },
    update() {},
    search() {},
    changeStyle() {},
    handleClose_dialog() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.drawer = false;
    },
    handleClose_2() {
      this.drawer_2 = false;
    },
    sure() {},
    setting() {},
    searchProStatus() {},
    searchGetStatus() {},
    finish() {},
    cancel() {},
    store_path() {},
    finish_2() {},
    cancel_2() {}
  }
};
</script>

<style lang="scss" scoped>

.equAcc {
  height: 100%;
  font-size: 16px;
  font-weight: 500;

  .header {
    position: relative;
    width: 100%;
    height: 5%;

    .add {
      position: absolute;
      right: 0;
    }
  }

  .equipment {
    width: 100%;
    height: calc(30% - 30px);
    border: 1px solid #ccc;

    .table {
      display: flex;
      height: calc(100% - 30px);
      flex-wrap: wrap;
      overflow: auto;
      margin-top: 0;
      padding-left: 20px;
    }

    .table .cell {
      width: 270px;
      height: 140px;
      border-right: 1px solid #ccc;
      background-color: #fff;
      border-radius: 10px;
      margin: 10px 10px;
      padding-left: 20px;
      box-shadow: 3px -9px 1px -3px #6fc444;
      flex-basis: calc(20% - 20px);
        /* 20% 表示每个 cell 的宽度为父元素宽度的 20%，并且减去外边距 */
    }
    .cell.delete-btn {
      position: absolute;
      /* 设置绝对定位 */
      top: 5px;
      /* 距离顶部 5px */
      right: 5px;
      /* 距离右侧 5px */
      background: none;
      /* 去除背景色 */
      border: none;
      /* 去除边框 */
      cursor: pointer;
      /* 设置鼠标样式为手型 */
    }
  }

  .production {
    width: 100%;
    height: calc(30% - 30px);
    border: 1px solid #ccc;
    margin-top: 10px;

    .table {
      display: flex;
      height: calc(100% - 30px);
      flex-wrap: wrap;
      overflow: auto;
      margin-top: 0;
      padding-left: 20px;
    }

    .table .cell {
      width: 270px;
      height: 140px;
      border-right: 1px solid #ccc;
      background-color: #fff;
      border-radius: 10px;
      margin: 10px 10px;
      padding-left: 20px;
      box-shadow: 3px -9px 1px -3px #6fc444;
            flex-basis: calc(20% - 20px);
    }
  }

  .service {
    width: 100%;
    height: calc(30% - 30px);
    border: 1px solid #ccc;
    margin-top: 10px;
    padding-left: 20px;

    .table {
      display: flex;
      height: calc(100% - 30px);
      flex-wrap: wrap;
      overflow: auto;
      margin-top: 0;
    }

    .table .cell {
      width: 270px;
      height: 140px;
      border-right: 1px solid #ccc;
      background-color: #fff;
      border-radius: 10px;
      margin: 10px 10px;
      padding-left: 20px;
      box-shadow: 3px -9px 1px -3px #6fc444;
            flex-basis: calc(20% - 20px);
    }
  }

  .table {
    width: 100%;
    margin-top: 20px;
  }
}

:deep(.el-table td div.cell) {
  text-align: center;
}

:deep(.el-table__header-wrapper thead th) {
  height: 20px;
  /* 设置表头行高 */
}

:deep(.el-table__body tr) {
  height: 30px;
  /* 设置行高 */
}

.custom-table {
  border-bottom: 1px solid #ccc;
  /* 设置表格的边框样式 */
}

:deep(.el-table) {
  --el-table-border-color: #ccc;
}

:deep(table thead th) {
  color: #000;
}

:deep(.el-table th) {
  font-size: 16px;
}

:deep(.el-table td) {
  font-size: 14px;
}

.sp {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
}

:deep(.el-drawer__body) {
  padding: 0 5px;
}

.line_1 {
  width: 100%;

  .port,
  .port_s {
    display: inline-block;
    width: 50%;
    margin-bottom: 10px;
    padding-left: 10px;
    margin-top: 20px;
  }

  .protocol,
  .protocol_s {
    display: inline-block;
    width: 30%;
    margin-bottom:10px;
    padding-left: 10px;
  }

  .port_setting {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding-left: 10px;

    .baud,
    .dataBits,
    .stopBits,
    .school {
      display: inline-block;
      width: 25%;
      height: 100%;
    }
  }

  .moubus_setting {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding-left: 10px;

    .m_type,
    .addr,
    .num {
      display: inline-block;
      width: 25%;
      height: 100%;
    }
  }

  .m_tab {
    width: 100%;
    height: 120px;
  }

  .lineCompile {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  }

  .issue {
    height: 30px;
    line-height: 30px;
  }

  .res_status .left,
  .res_status .right {
    width: 50%;
    display: inline-block;
  }
}

.line_1_ {
  width: 100%;

  .port,
  .port_s {
    display: inline-block;
    width: 50%;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  .protocol,
  .protocol_s {
    display: inline-block;
    width: 50%;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  .cont {
    padding-left: 10px;
  }

  .lineCompile {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  }

  .issue {
    height: 30px;
    line-height: 30px;
  }

  .res_status .left,
  .res_status .right {
    width: 50%;
    display: inline-block;
  }
}

.line_2 {
  width: 100%;
  padding-left: 10px;

  .period,
  .period_s {
    display: inline-block;
    width: 50%;
    margin-bottom: 10px;
  }

  .protocol,
  .protocol_s {
    display: inline-block;
    width: 50%;
    margin-bottom: 10px;
  }

  .storeFormat,
  .storeFormat_s {
    display: inline-block;
    width: 50%;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  .storePath {
    margin-top: 10px;
  }

  .status_lan {
    widows: 100%;
    height: 350px;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
