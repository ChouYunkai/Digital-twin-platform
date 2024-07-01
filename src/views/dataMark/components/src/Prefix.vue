<script setup lang="ts">
import { ref } from "vue";
import { FormInstance, FormRules } from "element-plus";

// 搜索表单数据
interface SearchData {
  markPrefix?: string; // 前缀标识
  prefixId?: string | number; // 前缀id
}

// 表单数据接口
interface FormData {
  status?: boolean; // 启用
  markPrefix?: string; // 前缀标识
  organization?: string; // 绑定机构
}

// 表格数据接口
interface TableData {
  prefixId?: string | number; // 前缀id
  markPrefix?: string; // 前缀标识
  status?: boolean; // 启用状态
  organization?: string; // 前缀绑定机构
  createTime?: string; // 前缀插入时间
}

const loading = ref(false);

const searchFormRef = ref();
const searchData = ref<SearchData>({});

const addFormRef = ref();
const addFormData = ref<FormData>({});
const addFormRules = ref<FormRules<FormData>>({
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
  markPrefix: [{ required: true, message: "请输入前缀标识", trigger: "blur" }],
  organization: [{ required: true, message: "请绑定机构", trigger: "blur" }]
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
    prefixId: "1",
    markPrefix: "MA.113.120.0887788887",
    status: true,
    organization: "北京联合智能科技有限公司",
    createTime: "2023-03-04 13:23:01"
  },
  {
    prefixId: "1",
    markPrefix: "MA.113.120.0887788887",
    status: true,
    organization: "北京联合智能科技有限公司",
    createTime: "2023-03-04 13:23:01"
  },
  {
    prefixId: "1",
    markPrefix: "MA.113.120.0887788887",
    status: true,
    organization: "北京联合智能科技有限公司",
    createTime: "2023-03-04 13:23:01"
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
      <el-form-item label="前缀标识">
        <el-input
          v-model="searchData.markPrefix"
          placeholder="请输入前缀标识"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="前缀id">
        <el-input
          v-model="searchData.prefixId"
          placeholder="请输入前缀id"
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
      <el-table-column prop="prefixId" label="前缀id" />
      <el-table-column prop="markPrefix" label="前缀标识" />
      <el-table-column prop="status" label="启用状态" />
      <el-table-column prop="organization" label="前缀绑定机构" />
      <el-table-column prop="createTime" label="前缀插入时间" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default>
          <el-button link type="primary" size="small">停用</el-button>
          <el-popconfirm title="确定要删除吗?">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
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
      <el-form-item label="启用" prop="status" label-width="140px">
        <el-radio-group v-model="addFormData.status">
          <el-radio :value="true">启用</el-radio>
          <el-radio :value="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="前缀标识" prop="markPrefix" label-width="140px">
        <el-input
          v-model="addFormData.markPrefix"
          autocomplete="off"
          placeholder="请输入前缀标识"
        >
          <template #prepend>MA.113.120.119M/</template>
        </el-input>
      </el-form-item>
      <el-form-item label="绑定机构" prop="organization" label-width="140px">
        <el-select
          v-model="addFormData.organization"
          placeholder="请选择绑定应用"
        >
          <el-option label="测试应用" value="测试应用" />
          <el-option label="测试应用1" value="测试应用1" />
        </el-select>
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
