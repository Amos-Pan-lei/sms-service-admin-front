<template>
  <div class="app-container">
    电话号码

    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>

      <el-form-item class="floatLeft">
        <el-text style="margin-right: 10px;">服务选择</el-text>
        <el-select
          v-model="chooseServiceCode"
          style="width: 250px;"
          class="floatLeft"
          :max-collapse-tags="1"
          collapse-tags-tooltip
          collapse-tags
          remote-show-suffix
          filterable
          placeholder="服务"
          value-key="countryId"
          loading-text="搜索中..."
          remote
          :remote-method="queryServiceOptions"
          @change="queryPage"
        >
          <el-option v-for="item in serviceOptions" :key="item.code" :label="item.name" :value="item.code">
            <el-text type="primary" style="float: left"> {{ item.name }} </el-text>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="floatLeft">
        <el-text style="margin-right: 10px;">国家地区选择</el-text>
        <el-select
          v-model="chooseCountryId"
          style="width: 250px;"
          class="floatLeft"
          :max-collapse-tags="1"
          collapse-tags-tooltip
          collapse-tags
          remote-show-suffix
          filterable
          placeholder="国家"
          value-key="countryId"
          loading-text="搜索中..."
          remote
          :remote-method="queryCountryOptions"
          @change="queryPage"
        >
          <el-option v-for="item in countryOptions" :key="item.countryId" :label="item.countryName" :value="item.countryId">
            <el-text type="primary" style="float: left"> {{ item.countryName }} </el-text>
          </el-option>

        </el-select>
      </el-form-item>

    </el-form>

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
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[50, 100, 200, 300, 400]"
      :small="false"
      :background="true"
      layout="total,sizes, prev, pager, next"
      :total="total"
      style="background-color: white;margin-bottom: 10px;"
      @size-change="queryPage"
      @current-change="queryPage"
    />
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
      chooseServiceCode: null,
      serviceOptions: [],
      chooseCountryId: null,
      countryOptions: [],
      list: null,
      listLoading: false,
      currentPage: 1,
      pageSize: 50,
      total: 0
    }
  },
  created() {
    this.queryPage()
  },
  methods: {
    fetchData() {

    },
    queryPage() {
      if (!this.chooseCountryId && !this.chooseServiceCode) {
        return
      }
      console.log(this.chooseServiceCode, this.chooseCountryId)
      console.log('分页')
      this.listLoading = true
      smsApi.getNumberList({
        countryCode: this.chooseCountryId,
        serviceCode: this.chooseServiceCode
      }).then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      })
    },
    queryServiceOptions(word) {
      smsApi.getServiceList().then(res => {
        this.serviceOptions = res.data.filter(e => e.name.toLowerCase().includes(word.toLowerCase()))
      })
    },
    queryCountryOptions(word) {
      smsApi.getCountryList().then(res => {
        this.countryOptions = res.data.filter(e => e.countryName.toLowerCase().includes(word.toLowerCase()))
      })
    }

  }
}
</script>
