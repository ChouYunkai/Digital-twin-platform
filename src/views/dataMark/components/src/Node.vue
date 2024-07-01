<script setup lang="ts">
import { ref } from "vue";
import { FormInstance, FormRules } from "element-plus";

// 搜索表单数据
interface SearchData {
  name?: string; // 节点名称
  id?: string | number; // 节点id
  ip?: string; // 节点ip
  port?: number; // 节点端口
}

// 表单数据接口
interface FormData {
  id?: string | number; // 节点id
  name?: string; // 节点名称
  prefix?: string; // 节点前缀
  type?: string; // 节点类型
  ip?: string; // 节点ip
  port?: number; // 节点端口
  level?: string | number; // 节点等级
  signType?: string; // 签名方式
  publicKey?: string; // 公钥
}

// 表格数据接口
interface TableData {
  id?: string | number; // 节点id
  name?: string; // 节点名称
  ip?: string; // 节点ip
  port?: number; // 节点port
  heartPort?: number; // 心跳监听端口
  prefix?: string; // 节点前缀
}

const loading = ref(false);

const searchFormRef = ref();
const searchData = ref<SearchData>({});

const addFormRef = ref();
const addFormData = ref<FormData>({});
const addFormRules = ref<FormRules<FormData>>({
  name: [{ required: true, message: "请输入节点名称", trigger: "blur" }],
  prefix: [{ required: true, message: "请输入节点前缀", trigger: "blur" }],
  type: [{ required: true, message: "请选择节点类型", trigger: "blur" }],
  ip: [{ required: true, message: "请输入节点ip", trigger: "blur" }],
  port: [{ required: true, message: "请输入节点端口", trigger: "blur" }],
  level: [{ required: true, message: "请选择节点等级", trigger: "blur" }],
  signType: [{ required: true, message: "请选择签名方式", trigger: "blur" }],
  publicKey: [{ required: true, message: "请输入公钥", trigger: "blur" }]
});

// 分页
const pagesOptions = ref<Pages>({
  total: 100,
  currentPage: 1,
  pageSize: 10,
  disabled: false
});

// 打开添加/编辑
const dialogFormVisible = ref(false);
const dialogFormTitle = ref("新增");
// 详情
const detailDrawer = ref(false);

const add = () => {
  dialogFormTitle.value = "新增";
  dialogFormVisible.value = true;
};

const onSearch = () => {};

const handleSizeChange = (val: number) => {
  console.log(val);
};
const handleCurrentChange = (val: number) => {
  console.log(val);
};

function openDialog(item: any) {
  if (item) {
    dialogFormTitle.value = "修改";
  }
  dialogFormVisible.value = true;
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const tableData: TableData[] = [
  {
    id: "1",
    name: "测试节点",
    ip: "110",
    port: 8080,
    heartPort: 9088,
    prefix: "MA.113.120.0887788887"
  },
  {
    id: "1",
    name: "测试节点",
    ip: "110",
    port: 8080,
    heartPort: 9088,
    prefix: "MA.113.120.0887788887"
  },
  {
    id: "1",
    name: "测试节点",
    ip: "110",
    port: 8080,
    heartPort: 9088,
    prefix: "MA.113.120.0887788887"
  }
];
</script>

<template>
  <div class="main">
    <el-form
      ref="searchFormRef"
      :inline="true"
      :model="searchData"
      label-position="top"
      class="search-form bg-bg_color pl-[20px] pt-[12px] overflow-auto mb-[20px] rounded-[10px]"
    >
      <el-form-item label="节点名称">
        <el-input
          v-model="searchData.name"
          placeholder="请输入节点名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="节点id">
        <el-input
          v-model="searchData.id"
          placeholder="请输入节点id"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="节点ip">
        <el-input
          v-model="searchData.ip"
          placeholder="请输入节点ip"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="节点端口">
        <el-input
          v-model="searchData.port"
          placeholder="请输入节点端口"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item class="ml-auto pt-[30px]">
        <el-button @click="resetForm(searchFormRef)"> 重置 </el-button>
        <el-button type="primary" :loading="loading" @click="onSearch">
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="bg-bg_color py-[20px] px-[20px] rounded-[10px]">
    <!-- 新增 icon 增不上 不明语法 -->
    <el-button type="primary" @click="add()">新增 </el-button>
    <el-table
      class="my-[20px]"
      :data="tableData"
      table-layout="auto"
      border
      :header-cell-style="{
        background: 'var(--el-fill-color-light)',
        color: 'var(--an-regular-text-color)',
        'font-weight': '400'
      }"
    >
      <el-table-column prop="id" label="标识地址" />
      <el-table-column prop="name" label="节点名称" />
      <el-table-column prop="ip" label="节点ip" />
      <el-table-column prop="port" label="节点port" />
      <el-table-column prop="heartPort" label="心跳监听端口" />
      <el-table-column prop="prefix" label="节点前缀" />
      <el-table-column fixed="right" label="操作" width="230">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="openDialog(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除吗?">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button link type="primary" size="small">纳入节点管理</el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="detailDrawer = true"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagesOptions.currentPage"
      v-model:page-size="pagesOptions.pageSize"
      class="flex justify-end"
      :total="pagesOptions.total"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :disabled="pagesOptions.disabled"
      background
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <el-drawer v-model="detailDrawer" title="查看" direction="rtl">
    <span>Hi, there!</span>
    <template #footer>
      <div style="flex: auto">
        <el-button>取消</el-button>
      </div>
    </template>
  </el-drawer>

  <el-dialog v-model="dialogFormVisible" :title="dialogFormTitle" width="500">
    <el-form
      ref="addFormRef"
      :model="addFormData"
      :rules="addFormRules"
      label-position="top"
    >
      <el-form-item label="节点名称" prop="name" label-width="140px">
        <el-input
          v-model="addFormData.name"
          autocomplete="off"
          placeholder="请输入节点名称"
        />
      </el-form-item>
      <el-form-item label="节点前缀" prop="prefix" label-width="140px">
        <el-select v-model="addFormData.prefix" placeholder="请选择节点前缀">
          <el-option label="测试应用" value="测试应用" />
          <el-option label="测试应用1" value="测试应用1" />
        </el-select>
      </el-form-item>
      <el-form-item label="节点类型" prop="type" label-width="140px">
        <el-select v-model="addFormData.type" placeholder="请选择节点类型">
          <el-option label="测试应用" value="测试应用" />
          <el-option label="测试应用1" value="测试应用1" />
        </el-select>
      </el-form-item>
      <el-form-item label="节点IP" prop="ip" label-width="140px">
        <el-input
          v-model="addFormData.ip"
          autocomplete="off"
          placeholder="请输入节点IP"
        />
      </el-form-item>
      <el-form-item label="节点端口" prop="port" label-width="140px">
        <el-input
          v-model="addFormData.port"
          autocomplete="off"
          placeholder="请输入节点端口"
        />
      </el-form-item>
      <el-form-item label="节点等级" prop="level" label-width="140px">
        <el-select v-model="addFormData.level" placeholder="请选择节点等级">
          <el-option label="测试应用" value="测试应用" />
          <el-option label="测试应用1" value="测试应用1" />
        </el-select>
      </el-form-item>
      <el-form-item label="签名方式" prop="signType" label-width="140px">
        <el-input
          v-model="addFormData.signType"
          autocomplete="off"
          placeholder="请输入签名方式"
        />
      </el-form-item>
      <el-form-item label="公钥" prop="publicKey" label-width="140px">
        <el-input
          v-model="addFormData.publicKey"
          autocomplete="off"
          placeholder="请输入公钥"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(addFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
