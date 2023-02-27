<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-row style="height: 60px;">
              <el-button icon="el-icon-plus" type="primary" size="small" @click="addRole">新增角色</el-button>
            </el-row>

            <!-- 表格 -->
            <el-table border :data="roleList">
              <el-table-column label="序号" type="index" width="120" align="center" />
              <el-table-column label="角色名称" width="240" prop="name" align="center" />
              <el-table-column label="描述" prop="description" align="center" />
              <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination
                :current-page.sync="page.page"
                :page-size="page.pagesize"
                layout="prev, pager, next"
                :total="page.total"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="resetForm">
        <el-form :model="roleForm" label-width="120px" :rules="rules" ref="roleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, updateRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'first',
      roleList: [],
      formData: {},
      page: {
        page: 1,
        pagesize: 5,
        total: 0,
      },
      dialogFormVisible: false,
      roleForm: {
        name: '',
        description: '',
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  computed: {
    ...mapGetters(['companyId']),
    title() {
      return this.roleForm.id ? '编辑角色' : '添加角色'
    },
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page)
      this.page.total = total
      this.roleList = rows
    },
    handleCurrentChange(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    deleteRole(id) {
      this.$confirm('您确定删除吗？')
        .then(async () => {
          await deleteRole(id)
          this.getRoleList()
          this.$message.success('删除成功')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editRole(roleInfo) {
      this.roleForm = roleInfo
      this.dialogFormVisible = true
    },
    addRole() {
      this.dialogFormVisible = true
    },
    submit() {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          if (this.roleForm.id) {
            await updateRole(this.roleForm)
            this.$message.success('更新角色成功')
          } else {
            await addRole(this.roleForm)
            this.$message.success('添加角色成功')
          }
          this.dialogFormVisible = false
          this.getRoleList()
        }
      })
    },
    resetForm() {
      this.roleForm = {
        name: '',
        description: '',
      }
      this.$refs.roleForm.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
