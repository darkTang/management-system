<template>
  <div>
    <UploadExcel :onSuccess="success" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: 'Import',
  data() {
    return {}
  },
  methods: {
    async success({ header, results }) {
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber',
      }
      const data = results.map(item => {
        const obj = {}
        Object.keys(userRelations).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            obj[userRelations[key]] = item[key]
          }
        })
        return obj
      })
      await importEmployee(data)
      this.$message.success('导入excel成功')
      this.$router.back()
    },
    // 转化excel的日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
