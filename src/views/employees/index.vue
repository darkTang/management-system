<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools showBefore>
        <span slot="before">共{{page.total}}条记录</span>
        <template v-slot:after>
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportData">excel导出</el-button>
          <el-button size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </PageTools>

      <el-card v-loading="loading">
        <el-table border :data="employeeList">
          <el-table-column label="序号" sortable type="index" width="60" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="头像" align="center">
            <template slot-scope="{row}">
              <img
                v-imgError="row.staffPhoto"
                alt
                style="width: 80px; height: 80px; border-radius: 50%; padding: 10px"
              />
            </template>
          </el-table-column>
          <el-table-column label="手机号" sortable prop="mobile" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{row}">{{row.timeOfEntry | dateFormat}}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable>
            <template slot-scope="{row}">
              <el-switch :value="row.enableState===1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployeeById(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>

      <!-- 放置弹层组件 -->
      <AddEmployee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import AddEmployee from './components/add-employee.vue'
import { getEmployeeList, delEmployeeById } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
export default {
  name: 'Employees',
  components: { AddEmployee },
  data() {
    return {
      employeeList: [],
      loading: true,
      page: {
        page: 1,
        size: 5,
        total: 0,
      },
      showDialog: false,
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { rows, total } = await getEmployeeList(this.page)
      this.loading = false
      this.page.total = total
      this.employeeList = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployeeById(id) {
      try {
        await this.$confirm('确定删除该员工吗')
        await delEmployeeById(id)
        this.$message.success('删除员工成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    exportData() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName',
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.total })
        const data = this.formatJson(rows, headers)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']] // 姓名和部门必须得写
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data, // 具体数据 必填
          filename: '员工信息表', // 非必填
          multiHeader,
          merges,
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
        })
      })
    },
    formatJson(rows, headers) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return this.formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    formatDate(time) {
      function padZero(value) {
        return value > 9 ? value : '0' + value
      }
      const date = new Date(time)
      const y = date.getFullYear()
      const m = padZero(date.getMonth() + 1)
      const d = padZero(date.getDate())
      return `${y}-${m}-${d}`
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
