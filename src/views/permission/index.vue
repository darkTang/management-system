<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <el-button slot="after" size="small" type="primary" @click="addPermission(1, '0')">添加权限</el-button>
      </page-tools>

      <el-table v-loading="loading" border :data="list" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button type="text" v-if="row.type === 1" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="editPerById(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 放置弹层，编辑权限 -->
    <el-dialog :title="showTitle" :visible.sync="showDialog" @close="btnCancel">
      <el-form ref="permissionRef" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, getPermissionDetail, updatePermission, addPermission, delPermission } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: '',
  data() {
    return {
      list: [],
      loading: false,
      showDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0', // 1开启  0关闭
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getPermissionList()
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑权限' : '添加权限'
    },
  },
  methods: {
    async getPermissionList() {
      this.loading = true
      this.list = transListToTreeData(await getPermissionList(), '0')
      this.loading = false
    },
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    async editPerById(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    async btnOk() {
      try {
        await this.$refs.permissionRef.validate()
        if (this.formData.id) {
          await updatePermission(this.formData)
          this.$message.success('更新权限成功')
        } else {
          await addPermission(this.formData)
          this.$message.success('新增权限成功')
        }
        this.getPermissionList()
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0', // 1开启  0关闭
      }
      this.$refs.permissionRef.resetFields()
      this.showDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
