<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools :treeNode="company" isRoot @addDepts="addDepts" />

        <el-tree :data="departments" :props="defaultProps">
          <TreeTools
            :treeNode="data"
            slot-scope="{data}"
            @delDepts="getDepartments"
            @editDepts="editDepts"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <AddDept
      :showDialog.sync="showDialog"
      :treeNode="node"
      :depts="depts"
      ref="treeTools"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Departments',
  components: { TreeTools, AddDept },
  data() {
    return {
      departments: [],
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      company: {
        name: 'XXXX科技有限公司',
        manager: '负责人',
        id: '',
      },
      showDialog: false,
      node: {},
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const { companyName, depts } = await getDepartments()
      this.depts = depts
      this.company.name = companyName
      this.departments = transListToTreeData(depts, '')
    },
    addDepts(node) {
      this.node = node
      this.showDialog = true
    },
    editDepts(node) {
      this.node = node
      this.showDialog = true
      this.$refs.treeTools.getDepartDetail(node.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
