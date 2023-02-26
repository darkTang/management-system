<template>
  <el-dialog :title="title" :visible="showDialog" @close="resetForm" :before-close="close">
    <el-form label-width="120px" :model="formData" :rules="rules" ref="deptForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model.trim="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model.trim="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model.trim="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model.trim="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>

    <el-row type="flex" justify="center" slot="footer">
      <el-col :span="8" style="display: flex; justify-content: space-around">
        <el-button size="small" style @click="close">取消</el-button>
        <el-button size="small" type="primary" @click="submit">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartment, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
// const checkNameRepeat = () => {}  访问不到vue实例
export default {
  name: 'AddDept',

  data() {
    // 在这里写可以使用this，如何写在外面，则访问不到vue实例
    const checkNameRepeat = (rule, value, callback) => {
      let isvalid = true
      if (this.formData.id) {
        if (this.depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)) {
          isvalid = false
        }
      } else {
        if (this.depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)) {
          isvalid = false
        }
      }
      isvalid ? callback() : callback(new Error(`同级部门已经有${value}了`))
    }
    const checkCodeRepeat = (rule, value, callback) => {
      let isvalid = true
      if (this.formData.id) {
        if (this.depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)) {
          isvalid = false
        }
      } else {
        if (this.depts.some(item => item.code === value && value)) {
          isvalid = false
        }
      }
      isvalid ? callback() : callback(new Error(`组织架构中已经有部门使用${value}编码`))
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' },
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' },
        ],
      },
      peoples: [],
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      type: Object,
      default: () => ({}),
    },
    depts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '添加子部门'
    },
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    submit() {
      this.$refs.deptForm.validate(async valid => {
        if (valid) {
          if (this.formData.id) {
            await updateDepartments(this.formData)
            this.$message.success('更新成功')
          } else {
            await addDepartment({ ...this.formData, pid: this.treeNode.id })
            this.$message.success('添加成功')
          }
          this.$emit('addDepts')
          this.close()
        }
      })
    },
    close() {
      this.$emit('update:showDialog', false)
    },
    resetForm() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      }
      this.$refs.deptForm.resetFields()
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    },
  },
}
</script>

<style scoped>
</style>
