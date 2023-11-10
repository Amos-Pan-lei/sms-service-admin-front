<template>
  <div class="app-container">
    激活的号码
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column label="激活id">
        <template slot-scope="scope">
          {{ scope.row.activationId }}
        </template>
      </el-table-column>
      <el-table-column label="服务编码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.phoneNumber }}
        </template>
      </el-table-column>
      <el-table-column label="费用" align="center">
        <template slot-scope="scope">
          {{ scope.row.activationCost }}
        </template>
      </el-table-column>
      <el-table-column label="激活状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.activationStatus }}
        </template>
      </el-table-column>
      <el-table-column label="sms编码" align="center">
        <template slot-scope="scope">
          {{ scope.row.smsCode }}
        </template>
      </el-table-column>
      <el-table-column label="短信内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.smsText }}
        </template>
      </el-table-column>
      <el-table-column label="激活时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.activationTime }}
        </template>
      </el-table-column>
      <el-table-column label="discount" align="center">
        <template slot-scope="scope">
          {{ scope.row.discount }}
        </template>
      </el-table-column>
      <el-table-column label="repeated" align="center">
        <template slot-scope="scope">
          {{ scope.row.repeated }}
        </template>
      </el-table-column>
      <el-table-column label="国家id" align="center">
        <template slot-scope="scope">
          {{ scope.row.countryCode }}
        </template>
      </el-table-column>
      <el-table-column label="国家" align="center">
        <template slot-scope="scope">
          {{ scope.row.countryName }}
        </template>
      </el-table-column>
      <el-table-column label="canGetAnotherSms" align="center">
        <template slot-scope="scope">
          {{ scope.row.canGetAnotherSms }}
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
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      smsApi.currentActivations().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
