<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="width: 100%;height: 40px;"
    :treeNode="treeNode"
  >
    <el-col>
      <span>{{treeNode.name}}</span>
    </el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <el-col>{{treeNode.manager}}</el-col>
        <el-col :span="5">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <template v-if="!isRoot">
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除部门</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment, addDepartment } from '@/api/departments'
export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object,
      default: () => ({}),
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCommand(type) {
      switch (type) {
        case 'add':
          this.$emit('addDepts', this.treeNode)
          break
        case 'edit':
          this.$emit('editDepts', this.treeNode)
          break
        case 'del':
          this.$confirm('您确定要删除该组织部门吗？')
            .then(() => {
              return delDepartment(this.treeNode.id)
            })
            .then(() => {
              this.$emit('delDepts')
              this.$message.success('删除成功')
            })
            .catch(err => {
              console.log(err)
            })
          break
      }
    },
  },
}
</script>