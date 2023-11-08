<template>
  <div class="app-container">
    电话号码
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="服务">
        <template slot-scope="scope">
          {{ scope.row.service.serviceName }}
        </template>
      </el-table-column>
      <el-table-column label="服务编码" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.service.serviceCode }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import * as smsApi from '@/api/sms'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      smsApi.getNumberList({
        countryCode: null,
        serviceCode: 'go'
      }).then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
